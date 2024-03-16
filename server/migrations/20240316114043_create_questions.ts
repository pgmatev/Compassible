import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("questions", (table) => {
    table.increments("id").primary();
    table.string("question").notNullable().unique();
    table.dateTime("created_at").defaultTo(knex.fn.now());
    table.dateTime("updated_at");
  });

  await knex.schema.createTable("answers", (table) => {
    table.increments("id").primary();
    table.string("answer").notNullable().unique();
    table
      .integer("question_id")
      .references("id")
      .inTable("questions")
      .onDelete("CASCADE");
    table.dateTime("created_at").defaultTo(knex.fn.now());
    table.dateTime("updated_at");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("answers");
  await knex.schema.dropTable("questions");
}
