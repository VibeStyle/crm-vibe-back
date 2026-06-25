import { Module } from '@nestjs/common';
import { OpenAiInvoiceExtractionService } from './openai-invoice-extraction.service';

@Module({
  providers: [OpenAiInvoiceExtractionService],
  exports: [OpenAiInvoiceExtractionService],
})
export class OpenAiModule {}
