import { Migration } from '@mikro-orm/migrations';

export class Migration20240315211014 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" varchar(255) not null, "created_at" timestamptz not null default CURRENT_TIMESTAMP, "updated_at" timestamptz null, "email" varchar(255) not null, "refresh_token" varchar(255) null, "active" boolean not null default true, constraint "user_pkey" primary key ("id"));');
    this.addSql('create index "user_created_at_index" on "user" ("created_at");');
    this.addSql('create index "user_email_index" on "user" ("email");');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "user" cascade;');
  }

}