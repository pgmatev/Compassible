import { Knex } from "knex";
import { scheduler } from "timers/promises";


export async function up(knex: Knex): Promise<void> {
    const tableExists = await knex.schema.hasTable('users');
    if (!tableExists)
    {
        await knex.schema.createTable('users', table => {
            table.increments('id').primary();
            table.string('username').notNullable().unique();
            table.string('name');
            table.string('email').unique().notNullable();
            table.dateTime('created_at').defaultTo(knex.fn.now());
            table.dateTime('updated_at');
        });
    }
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('users');
}

