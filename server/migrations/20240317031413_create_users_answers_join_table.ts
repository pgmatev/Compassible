import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  const tableExists = await knex.schema.hasTable("users_answers");
  if (!tableExists) {
    await knex.schema.createTable("users_answers", (table) => {
      table.increments("id").primary();
      table
        .integer("user_id")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table
        .integer("answer_id")
        .references("id")
        .inTable("answers")
        .onDelete("CASCADE");
      table.unique(["user_id", "answer_id"]);
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("users_answers");
}
