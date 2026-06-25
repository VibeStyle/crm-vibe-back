import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { z } from 'zod';
import { zodTextFormat } from 'openai/helpers/zod';

const InvoiceExtractionSchema = z.object({
  dateOfService: z.string().nullable(), // YYYY-MM-DD
  claimNumber: z.string().nullable(),
  invoiceNumber: z.string().nullable(),
  appraiserName: z.string().nullable(),
  insured: z.string().nullable(),
  state: z.string().nullable(),
  claimTotal: z.number().nullable(),
  awardAmount: z.number().nullable(),
});

export type InvoiceExtractionResult = z.infer<typeof InvoiceExtractionSchema>;

@Injectable()
export class OpenAiInvoiceExtractionService {
  private readonly logger = new Logger(OpenAiInvoiceExtractionService.name);
  private readonly client: OpenAI;

  constructor(private readonly config: ConfigService) {
    const apiKey = this.config.get<string>('gpt.gptApiKey');

    if (!apiKey) {
      throw new Error('OPENAI_API_KEY is missing');
    }

    this.client = new OpenAI({ apiKey });
  }

  async extractInvoiceData(
    file: Express.Multer.File,
  ): Promise<InvoiceExtractionResult> {
    if (!file) {
      throw new InternalServerErrorException('No file provided for extraction');
    }

    const base64 = file.buffer.toString('base64');

    const content: any[] = [
      {
        type: 'input_text',
        text: [
          'Extract invoice fields from the attached file.',
          'Return only the schema fields.',
          'If a field is missing, return null.',
          'Do not guess.',
          'Rules:',
          '- dateOfService = service/activity date, not createdAt in database.',
          '- claimNumber = value labeled Claim # / Claim Number.',
          '- invoiceNumber = value labeled Invoice Number.',
          '- appraiserName = appraiser name exactly as shown; include license/code if it appears in the same field.',
          '- insured = insured/customer name.',
          '- state = 2-letter state code when present.',
          '- claimTotal = first use amount labeled TOTAL DUE.',
          '- If TOTAL DUE is not present, use amount labeled Total when it represents the invoice total.',
          '- On hourly invoices, Total may equal Rate/Unit Price × Time/Qty; treat that Total as claimTotal.',
          '- Never use award amount as claimTotal.',
          '- awardAmount = only if explicitly labeled award amount.',
          '- Return dateOfService in YYYY-MM-DD format.',
          '- Return money fields as numbers without currency symbols or commas.',
        ].join(' '),
      },
    ];

    if (this.isImage(file.mimetype)) {
      content.push({
        type: 'input_image',
        image_url: `data:${file.mimetype};base64,${base64}`,
      });
    } else {
      content.push({
        type: 'input_file',
        filename: file.originalname,
        file_data: `data:${file.mimetype};base64,${base64}`,
      });
    }

    try {
      const response = await this.client.responses.parse({
        model: 'gpt-5.4',
        input: [
          {
            role: 'system',
            content:
              'You are a precise invoice extraction engine. Extract only values explicitly present in the file.',
          },
          {
            role: 'user',
            content,
          },
        ],
        text: {
          format: zodTextFormat(InvoiceExtractionSchema, 'invoice_extraction'),
        },
      });

      if (!response.output_parsed) {
        throw new InternalServerErrorException(
          'Model returned no parsed output',
        );
      }

      return response.output_parsed;
    } catch (error) {
      this.logger.error(
        `OpenAI invoice extraction failed for file: ${file.originalname}`,
        error,
      );
      throw new InternalServerErrorException(
        `Invoice extraction failed for file: ${file.originalname}`,
      );
    }
  }

  private isImage(mimetype: string): boolean {
    return mimetype === 'image/png' || mimetype === 'image/jpeg';
  }
}
