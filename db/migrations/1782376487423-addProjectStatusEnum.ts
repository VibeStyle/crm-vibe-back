import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProjectStatusEnum1782376487423
  implements MigrationInterface
{
  name = 'AddProjectStatusEnum1782376487423';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."project_status_enum" AS ENUM('lead', 'in_progress', 'finished', 'cancelled')`,
    );
    await queryRunner.query(
      `UPDATE "projects"
       SET "status" = CASE
         WHEN "status" IN ('lead', 'in_progress', 'finished', 'cancelled') THEN "status"
         WHEN "status" = 'completed' THEN 'finished'
         WHEN "status" = 'archived' THEN 'cancelled'
         WHEN "status" IS NULL OR "status" = '' THEN 'lead'
         ELSE 'lead'
       END`,
    );
    await queryRunner.query(
      `ALTER TABLE "projects" ALTER COLUMN "status" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "projects" ALTER COLUMN "status" TYPE "public"."project_status_enum" USING "status"::"public"."project_status_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "projects" ALTER COLUMN "status" SET DEFAULT 'lead'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "projects" ALTER COLUMN "status" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "projects" ALTER COLUMN "status" TYPE character varying USING "status"::text`,
    );
    await queryRunner.query(
      `ALTER TABLE "projects" ALTER COLUMN "status" SET DEFAULT ''`,
    );
    await queryRunner.query(`DROP TYPE "public"."project_status_enum"`);
  }
}
