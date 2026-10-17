import { Module } from "@medusajs/framework/utils"
import Test17octModuleService from "./service"

export const TEST17OCT_MODULE = "test17oct"

export default Module(TEST17OCT_MODULE, {
  service: Test17octModuleService,
})
