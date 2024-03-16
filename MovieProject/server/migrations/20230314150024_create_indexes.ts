import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.table('users', table => {
        table.index('username', 'idx_username');
        table.index('id');
    })
    await knex.schema.table('movies', table => {
        table.index('id', 'idx_id');
        table.index('title', 'idx_title');
    })
    await knex.schema.table('likes', table => {
        table.index(['movie_id', 'user_id'], 'idx_movie_id_user_id');
        table.index('user_id', 'idx_user_id');
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.table('users', table => {
        table.dropIndex('id');
        table.dropIndex('username');
    })

    await knex.schema.table('movies', table => {
        table.dropIndex('','idx_id');
        table.dropIndex('', 'idx_title');
    })

    await knex.schema.table('likes', table => {
        table.dropIndex('', 'idx_movie_id_user_id');
        table.dropIndex('', 'idx_user_id');
    })
}

