import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  const tableExists = await knex.schema.hasTable("users");
  if (!tableExists) {
    await knex.schema.createTable("users", (table) => {
      table.increments("id").primary();
      table.string("username").notNullable().unique();
      table.string("password").notNullable().defaultTo("no pass");
      table.dateTime("created_at").defaultTo(knex.fn.now());
      table.dateTime("updated_at");
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("users");
}
