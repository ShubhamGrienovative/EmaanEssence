import { model } from "@medusajs/framework/utils"

export const Logo = model
  .define("logo", {
    id: model.id({ prefix: "logo" }).primaryKey(),
    title: model.text().nullable(),
    type: model.text().default("default"),
    image_url: model.text(),
    dark_image_url: model.text().nullable(),
    alt_text: model.text().nullable(),
    link_url: model.text().nullable(),
    is_active: model.boolean().default(true),
    metadata: model.json().nullable(),
  })
  .indexes([
    {
      on: ["is_active"],
    },
    {
      on: ["type"],
    },
  ])

export default Logo
