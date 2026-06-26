import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserEmailVerified1782376487420 implements MigrationInterface {
  name = 'AddUserEmailVerified1782376487420';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "emailVerified" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `UPDATE "users" SET "emailVerified" = true WHERE "active" = true OR COALESCE("verificationCode", '') = ''`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "emailVerified"`);
  }
}
