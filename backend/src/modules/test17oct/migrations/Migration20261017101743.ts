import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20261017101743 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "test17oct" ("id" text not null, "name" text null, "description" text null, "is_active" boolean not null default true, "metadata" jsonb null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "test17oct_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_test17oct_deleted_at" ON "test17oct" ("deleted_at") WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "test17oct" cascade;`);
  }

}
