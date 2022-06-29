import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsers1656473310813 implements MigrationInterface {
    name = 'CreateUsers1656473310813'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users_follows_users" ("usersId_1" uuid NOT NULL, "usersId_2" uuid NOT NULL, CONSTRAINT "PK_1fbb5622248249838d3006905e5" PRIMARY KEY ("usersId_1", "usersId_2"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9d4de65b9416f40fbf335da40a" ON "users_follows_users" ("usersId_1") `);
        await queryRunner.query(`CREATE INDEX "IDX_4bfcccd7c37fde5bc3b97deb07" ON "users_follows_users" ("usersId_2") `);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "deleted_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "deleted_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users_follows_users" ADD CONSTRAINT "FK_9d4de65b9416f40fbf335da40a5" FOREIGN KEY ("usersId_1") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_follows_users" ADD CONSTRAINT "FK_4bfcccd7c37fde5bc3b97deb07d" FOREIGN KEY ("usersId_2") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_follows_users" DROP CONSTRAINT "FK_4bfcccd7c37fde5bc3b97deb07d"`);
        await queryRunner.query(`ALTER TABLE "users_follows_users" DROP CONSTRAINT "FK_9d4de65b9416f40fbf335da40a5"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "deleted_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "deleted_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4bfcccd7c37fde5bc3b97deb07"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9d4de65b9416f40fbf335da40a"`);
        await queryRunner.query(`DROP TABLE "users_follows_users"`);
    }

}
