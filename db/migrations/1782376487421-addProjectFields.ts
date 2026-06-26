import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProjectFields1782376487421 implements MigrationInterface {
  name = 'AddProjectFields1782376487421';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "projects" ADD "liveLink" character varying NOT NULL DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "projects" ADD "figmaLink" character varying NOT NULL DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "projects" ADD "status" character varying NOT NULL DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "projects" ADD "nda" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "nda"`);
    await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "status"`);
    await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "figmaLink"`);
    await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "liveLink"`);
  }
}
