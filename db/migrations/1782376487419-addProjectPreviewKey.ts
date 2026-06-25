import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProjectPreviewKey1782376487419
  implements MigrationInterface
{
  name = 'AddProjectPreviewKey1782376487419';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "projects" ADD "previewKey" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "previewKey"`);
  }
}
