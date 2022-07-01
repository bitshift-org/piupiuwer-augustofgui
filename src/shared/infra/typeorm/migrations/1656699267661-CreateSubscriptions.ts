import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class CreateSubscriptions1656699267661 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "subscriptions",
      new TableColumn({
        name: "created_at",
        type: "timestamp",
        default: "now()",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("subscriptions", "created_at");
  }
}
