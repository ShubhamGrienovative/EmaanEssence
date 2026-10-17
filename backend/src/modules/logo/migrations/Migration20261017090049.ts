import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20261017090049 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "logo" ("id" text not null, "title" text null, "type" text not null default 'default', "image_url" text not null, "dark_image_url" text null, "alt_text" text null, "link_url" text null, "is_active" boolean not null default true, "metadata" jsonb null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "logo_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_logo_deleted_at" ON "logo" ("deleted_at") WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_logo_is_active" ON "logo" ("is_active") WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_logo_type" ON "logo" ("type") WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "logo" cascade;`);
  }

}
