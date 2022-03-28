import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration1648161692001 implements MigrationInterface {
    name = 'InitialMigration1648161692001'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "TrakkRegistration" ("zebrraId" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying, "firstName" character varying NOT NULL, "middleName" character varying, "lastName" character varying NOT NULL, "phoneNumber" character varying, "address" character varying, "dateOfBirth" TIMESTAMP, "isAdmin" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "UQ_1f916103080849b04c756a2faa5" UNIQUE ("email"), CONSTRAINT "PK_53deafed4103dbd37c82fe6e19e" PRIMARY KEY ("zebrraId"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "TrakkRegistration"`);
    }

}
