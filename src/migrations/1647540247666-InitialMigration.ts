import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration1647540247666 implements MigrationInterface {
    name = 'InitialMigration1647540247666'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "TestModelTable" ("id" SERIAL NOT NULL, "date_created" TIMESTAMP NOT NULL DEFAULT now(), "date_updated" TIMESTAMP NOT NULL DEFAULT now(), "row_version" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_f9da81e46174da8121c81f987cf" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "TestModelTable"`);
    }

}
