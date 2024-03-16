import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('movies', table => {
        table.dropColumn('name');
        table.string('title').notNullable();
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('movies', table => {
        table.dropColumn('title');
        table.string('name').notNullable();
    })
}

