import { TableColumn, MigrationInterface, QueryRunner } from "typeorm";

export class CreateLikes1656710252729 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "likes",
      new TableColumn({
        name: "created_at",
        type: "timestamp",
        default: "now()",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("likes", "created_at");
  }
}
