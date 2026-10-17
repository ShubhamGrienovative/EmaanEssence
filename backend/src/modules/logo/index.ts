import { Module } from "@medusajs/framework/utils"
import LogoModuleService from "./service"

export const LOGO_MODULE = "logo"

export default Module(LOGO_MODULE, {
  service: LogoModuleService,
})
