import { Module } from "@nestjs/common";
import { AuditModule } from "../audit/audit.module.js";
import { BankingController } from "./banking.controller.js";
import { BankingService } from "./banking.service.js";

@Module({
  imports: [AuditModule],
  controllers: [BankingController],
  providers: [BankingService]
})
export class BankingModule {}
