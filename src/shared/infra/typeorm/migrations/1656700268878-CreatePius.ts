import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreatePius1656700268878 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "pius",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "author_id",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "content",
            type: "varchar",
          },
        ],
      })
    );

    await queryRunner.createTable(
      new Table({
        name: "likes",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "piu_id",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "user_id",
            type: "uuid",
            isNullable: true,
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "pius",
      new TableForeignKey({
        name: "PiuAuthor",
        columnNames: ["author_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "SET NULL",
      })
    );

    await queryRunner.createForeignKey(
      "likes",
      new TableForeignKey({
        name: "PiuLikeOwner",
        columnNames: ["piu_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "pius",
        onDelete: "SET NULL",
      })
    );

    await queryRunner.createForeignKey(
      "likes",
      new TableForeignKey({
        name: "PiuLikeTarget",
        columnNames: ["user_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "SET NULL",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("pius", "PiuLikesTarget");
    await queryRunner.dropForeignKey("pius", "PiuLikesOwner");
    await queryRunner.dropForeignKey("pius", "PiuAuthor");
    await queryRunner.dropTable("pius");
  }
}
