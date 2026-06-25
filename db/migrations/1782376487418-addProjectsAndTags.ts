import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProjectsAndTags1782376487418 implements MigrationInterface {
  name = 'AddProjectsAndTags1782376487418';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "pg_trgm"`);
    await queryRunner.query(`CREATE TABLE "projects" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" text, "previewUrl" character varying, "isPublished" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_projects_id" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "tags" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "slug" character varying NOT NULL, "category" character varying NOT NULL DEFAULT 'custom', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_tags_slug_category" UNIQUE ("slug", "category"), CONSTRAINT "PK_tags_id" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "project_tags" ("projectId" integer NOT NULL, "tagId" integer NOT NULL, CONSTRAINT "PK_project_tags" PRIMARY KEY ("projectId", "tagId"))`);
    await queryRunner.query(`CREATE INDEX "IDX_projects_name_trgm" ON "projects" USING gin ("name" gin_trgm_ops)`);
    await queryRunner.query(`CREATE INDEX "IDX_tags_category" ON "tags" ("category")`);
    await queryRunner.query(`CREATE INDEX "IDX_tags_slug" ON "tags" ("slug")`);
    await queryRunner.query(`CREATE INDEX "IDX_project_tags_project" ON "project_tags" ("projectId")`);
    await queryRunner.query(`CREATE INDEX "IDX_project_tags_tag" ON "project_tags" ("tagId")`);
    await queryRunner.query(`ALTER TABLE "project_tags" ADD CONSTRAINT "FK_project_tags_project" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE "project_tags" ADD CONSTRAINT "FK_project_tags_tag" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "project_tags" DROP CONSTRAINT "FK_project_tags_tag"`);
    await queryRunner.query(`ALTER TABLE "project_tags" DROP CONSTRAINT "FK_project_tags_project"`);
    await queryRunner.query(`DROP INDEX "IDX_project_tags_tag"`);
    await queryRunner.query(`DROP INDEX "IDX_project_tags_project"`);
    await queryRunner.query(`DROP INDEX "IDX_tags_slug"`);
    await queryRunner.query(`DROP INDEX "IDX_tags_category"`);
    await queryRunner.query(`DROP INDEX "IDX_projects_name_trgm"`);
    await queryRunner.query(`DROP TABLE "project_tags"`);
    await queryRunner.query(`DROP TABLE "tags"`);
    await queryRunner.query(`DROP TABLE "projects"`);
  }
}
