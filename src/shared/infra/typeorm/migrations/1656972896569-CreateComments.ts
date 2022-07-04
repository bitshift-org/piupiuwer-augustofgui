import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateComments1656972896569 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "comments",
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
            name: "author",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "content",
            type: "varchar",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "comments",
      new TableForeignKey({
        name: "CommentOwner",
        columnNames: ["owner_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "pius",
        onDelete: "SET NULL",
      })
    );

    await queryRunner.createForeignKey(
      "comments",
      new TableForeignKey({
        name: "CommentAuthor",
        columnNames: ["author"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "SET NULL",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("comments", "CommentAuthor");
    await queryRunner.dropForeignKey("comments", "CommentOwner");
    await queryRunner.dropTable("comments");
  }
}
