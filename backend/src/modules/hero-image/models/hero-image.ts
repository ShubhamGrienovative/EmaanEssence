import { model } from "@medusajs/framework/utils"

export const HeroImage = model
  .define("hero_image", {
    id: model.id({ prefix: "hero_img" }).primaryKey(),
    title: model.text().nullable(),
    subtitle: model.text().nullable(),
    image_url: model.text(),
    mobile_image_url: model.text().nullable(),
    alt_text: model.text().nullable(),
    link_url: model.text().nullable(),
    button_text: model.text().nullable(),
    display_order: model.number().default(0),
    is_active: model.boolean().default(true),
    metadata: model.json().nullable(),
  })
  .indexes([
    {
      on: ["is_active"],
    },
    {
      on: ["display_order"],
    },
  ])

export default HeroImage
