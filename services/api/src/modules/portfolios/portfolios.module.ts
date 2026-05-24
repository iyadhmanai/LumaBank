import { Module } from "@nestjs/common";
import { AuditModule } from "../audit/audit.module.js";
import { PortfoliosController } from "./portfolios.controller.js";
import { PortfoliosService } from "./portfolios.service.js";

@Module({
  imports: [AuditModule],
  controllers: [PortfoliosController],
  providers: [PortfoliosService]
})
export class PortfoliosModule {}
