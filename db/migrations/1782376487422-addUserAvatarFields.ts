import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserAvatarFields1782376487422 implements MigrationInterface {
  name = 'AddUserAvatarFields1782376487422';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "avatarUrl" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "avatarKey" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "avatarKey"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "avatarUrl"`);
  }
}
