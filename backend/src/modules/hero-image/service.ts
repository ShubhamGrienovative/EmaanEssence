import { MedusaService } from "@medusajs/framework/utils"
import { HeroImage } from "./models/hero-image"

class HeroImageModuleService extends MedusaService({
  HeroImage,
}) {}

export default HeroImageModuleService
