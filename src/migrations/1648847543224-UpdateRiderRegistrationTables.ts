import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateRiderRegistrationTables1648847543224 implements MigrationInterface {
    name = 'UpdateRiderRegistrationTables1648847543224'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "VehicleDocuments" ("id" SERIAL NOT NULL, "vehicleId" integer NOT NULL, "documentName" character varying NOT NULL, "documentUrl" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "UQ_b4f0fa97bde7f2d654390fee184" UNIQUE ("documentUrl"), CONSTRAINT "REL_de690fefdf192ac0f8e2e05550" UNIQUE ("vehicleId"), CONSTRAINT "PK_32ef487899cf694cb94ee71df31" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Vehicle" ("id" SERIAL NOT NULL, "riderId" integer NOT NULL, "name" character varying NOT NULL, "color" character varying NOT NULL, "vehicleNumber" character varying NOT NULL, "capacity" character varying NOT NULL, "image" text array NOT NULL DEFAULT '{}', "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "vehicleDocumentsId" integer, CONSTRAINT "UQ_0759b1b5a34853929c48bc1721a" UNIQUE ("vehicleNumber"), CONSTRAINT "REL_62547516c54604b56553f5f426" UNIQUE ("riderId"), CONSTRAINT "PK_7124b1b9d8e76a0a3dcfc7ed98d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Rider" ("id" SERIAL NOT NULL, "zebrraId" character varying NOT NULL, "avatar" character varying NOT NULL, "dateOfBirth" character varying NOT NULL, "stateOfOrigin" character varying NOT NULL, "stateOfResidence" character varying NOT NULL, "residentialAddress" character varying NOT NULL, "phone" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "userZebrraId" character varying, CONSTRAINT "UQ_f41e9fd95aa7688ab57115bba5f" UNIQUE ("phone"), CONSTRAINT "REL_eaeda0aaf72d20330ccec420c8" UNIQUE ("userZebrraId"), CONSTRAINT "PK_cfe2f07d8de1616045e151f0183" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "NextOfKin" ("id" SERIAL NOT NULL, "riderId" integer NOT NULL, "fullName" character varying NOT NULL, "address" character varying NOT NULL, "phone" character varying NOT NULL, "email" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "REL_24d9531c063fc22c8021f48d23" UNIQUE ("riderId"), CONSTRAINT "PK_c111914d4d4a941e021e86829fb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "VehicleDocuments" ADD CONSTRAINT "FK_de690fefdf192ac0f8e2e055507" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Vehicle" ADD CONSTRAINT "FK_62547516c54604b56553f5f426b" FOREIGN KEY ("riderId") REFERENCES "Rider"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Vehicle" ADD CONSTRAINT "FK_bb810e188f5c1820da6da98f53e" FOREIGN KEY ("vehicleDocumentsId") REFERENCES "VehicleDocuments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Rider" ADD CONSTRAINT "FK_eaeda0aaf72d20330ccec420c83" FOREIGN KEY ("userZebrraId") REFERENCES "TrakkRegistration"("zebrraId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "NextOfKin" ADD CONSTRAINT "FK_24d9531c063fc22c8021f48d234" FOREIGN KEY ("riderId") REFERENCES "Rider"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "NextOfKin" DROP CONSTRAINT "FK_24d9531c063fc22c8021f48d234"`);
        await queryRunner.query(`ALTER TABLE "Rider" DROP CONSTRAINT "FK_eaeda0aaf72d20330ccec420c83"`);
        await queryRunner.query(`ALTER TABLE "Vehicle" DROP CONSTRAINT "FK_bb810e188f5c1820da6da98f53e"`);
        await queryRunner.query(`ALTER TABLE "Vehicle" DROP CONSTRAINT "FK_62547516c54604b56553f5f426b"`);
        await queryRunner.query(`ALTER TABLE "VehicleDocuments" DROP CONSTRAINT "FK_de690fefdf192ac0f8e2e055507"`);
        await queryRunner.query(`DROP TABLE "NextOfKin"`);
        await queryRunner.query(`DROP TABLE "Rider"`);
        await queryRunner.query(`DROP TABLE "Vehicle"`);
        await queryRunner.query(`DROP TABLE "VehicleDocuments"`);
    }

}
