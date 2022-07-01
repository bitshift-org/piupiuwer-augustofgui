import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateSubscriptions1656698642018 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "subscriptions",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "owner_id",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "followed_id",
            type: "uuid",
            isNullable: true,
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "subscriptions",
      new TableForeignKey({
        name: "SubscriptionOwner",
        columnNames: ["owner_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "SET NULL",
      })
    );

    await queryRunner.createForeignKey(
      "subscriptions",
      new TableForeignKey({
        name: "SubscriptionTarget",
        columnNames: ["followed_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "SET NULL",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('subscriptions', "SubscriptionTarget");
    await queryRunner.dropForeignKey('subscriptions', "SubscriptionOwner");
    await queryRunner.dropTable("subscriptions");
  }
}
