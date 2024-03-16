import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("active_question", (table) => {
    table.increments("id").primary();
    table.integer("question_id").references("id").inTable("questions");
    table.dateTime("expiration_time");
    table.dateTime("created_at").defaultTo(knex.fn.now());
    table.dateTime("updated_at");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("active_question");
}
