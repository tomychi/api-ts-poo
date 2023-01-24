import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeUser1674598100872 implements MigrationInterface {
    name = 'ChangeUser1674598100872'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`role\` enum ('USER', 'CUSTOMER', 'ADMIN') NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`role\``);
    }

}
