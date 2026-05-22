import { Module } from "@nestjs/common";
import { AuditModule } from "./modules/audit/audit.module.js";
import { BankingModule } from "./modules/banking/banking.module.js";
import { HealthModule } from "./modules/health/health.module.js";
import { InstrumentsModule } from "./modules/instruments/instruments.module.js";

@Module({
  imports: [AuditModule, BankingModule, HealthModule, InstrumentsModule]
})
export class AppModule {}
