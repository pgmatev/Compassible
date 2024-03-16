import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const tableExists = await knex.schema.hasTable('likes');
    if (!tableExists)
    {
        await knex.schema.createTable('likes', table => {
            table.increments('id').primary();
            table.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
            table.integer('movie_id').references('id').inTable('movies').onDelete('CASCADE');
            table.unique(['user_id', 'movie_id']);
        });
    }
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('likes');
}

