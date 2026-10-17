import { MedusaService } from "@medusajs/framework/utils"
import { Logo } from "./models/logo"

class LogoModuleService extends MedusaService({
  Logo,
}) {}

export default LogoModuleService
