import { Module } from "@medusajs/framework/utils"
import HeroImageModuleService from "./service"

export const HERO_IMAGE_MODULE = "heroImage"

export default Module(HERO_IMAGE_MODULE, {
  service: HeroImageModuleService,
})
