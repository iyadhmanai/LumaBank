import { Controller, Get } from "@nestjs/common";
import { productName } from "@luma-bank/domain";

@Controller("health")
export class HealthController {
  @Get()
  getHealth() {
    return {
      status: "ok",
      service: `${productName} API`
    };
  }
}
