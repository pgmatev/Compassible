import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  knex.schema.table("active_question", function (table) {
    table.dropForeign("question_id");
    table
      .foreign("question_id")
      .references("id")
      .inTable("questions")
      .onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {}
