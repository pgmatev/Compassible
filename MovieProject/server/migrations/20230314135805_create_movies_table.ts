import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTableIfNotExists('movies', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('description', 1000);
        table.string('director_name');
        table.date('release_date');
        table.dateTime('created_at').defaultTo(knex.fn.now());
        table.dateTime('updated_at');
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('moveis');
}

