import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    knex.schema.alterTable('movies', table =>{
        table.dateTime('updated_at').defaultTo(knex.fn.now()).alter();
    })
    knex.schema.alterTable('users', table =>{
        table.dateTime('updated_at').defaultTo(knex.fn.now()).alter();
    })
}


export async function down(knex: Knex): Promise<void> {
    knex.schema.alterTable('movies', table => {
        table.dropColumn('updated_at');
    })
    knex.schema.alterTable('users', table => {
        table.dropColumn('updated_at');
    })
    knex.schema.alterTable('movies', table =>{
        table.dateTime('updated_at');
    })
    knex.schema.alterTable('users', table =>{
        table.dateTime('updated_at');
    })
}