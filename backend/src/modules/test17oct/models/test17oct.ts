import { model } from "@medusajs/framework/utils"

export const Test17oct = model.define("test17oct", {
  id: model.id({ prefix: "tst" }).primaryKey(),
  name: model.text().nullable(),
  description: model.text().nullable(),
  is_active: model.boolean().default(true),
  metadata: model.json().nullable(),
})

export default Test17oct
