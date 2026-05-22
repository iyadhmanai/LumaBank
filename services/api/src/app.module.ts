import { Module } from "@nestjs/common";
import { AuditModule } from "./modules/audit/audit.module.js";
import { HealthModule } from "./modules/health/health.module.js";

@Module({
  imports: [AuditModule, HealthModule]
})
export class AppModule {}
