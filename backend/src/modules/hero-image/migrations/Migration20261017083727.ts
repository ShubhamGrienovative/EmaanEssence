import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20261017083727 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "hero_image" ("id" text not null, "title" text null, "subtitle" text null, "image_url" text not null, "mobile_image_url" text null, "alt_text" text null, "link_url" text null, "button_text" text null, "display_order" integer not null default 0, "is_active" boolean not null default true, "metadata" jsonb null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "hero_image_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_hero_image_deleted_at" ON "hero_image" ("deleted_at") WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_hero_image_is_active" ON "hero_image" ("is_active") WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_hero_image_display_order" ON "hero_image" ("display_order") WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "hero_image" cascade;`);
  }

}
