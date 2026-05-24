import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from "@nestjs/common";
import type { PortfolioAllocationInput } from "@luma-bank/domain/portfolios";
import { PortfoliosService } from "./portfolios.service.js";

@Controller("portfolios")
export class PortfoliosController {
  constructor(@Inject(PortfoliosService) private readonly portfoliosService: PortfoliosService) {}

  @Get()
  list() {
    return this.portfoliosService.list();
  }

  @Post()
  create() {
    return this.portfoliosService.create();
  }

  @Get(":portfolioId")
  getById(@Param("portfolioId") portfolioId: string) {
    return this.portfoliosService.getById(portfolioId);
  }

  @Post(":portfolioId/holdings")
  addHolding(@Param("portfolioId") portfolioId: string, @Body() body: PortfolioAllocationInput) {
    return this.portfoliosService.addHolding(portfolioId, body);
  }

  @Patch(":portfolioId/holdings/:holdingId")
  updateHolding(
    @Param("portfolioId") portfolioId: string,
    @Param("holdingId") holdingId: string,
    @Body() body: PortfolioAllocationInput
  ) {
    return this.portfoliosService.updateHolding(portfolioId, holdingId, body);
  }

  @Delete(":portfolioId/holdings/:holdingId")
  removeHolding(@Param("portfolioId") portfolioId: string, @Param("holdingId") holdingId: string) {
    return this.portfoliosService.removeHolding(portfolioId, holdingId);
  }

  @Get(":portfolioId/metrics")
  getMetrics(@Param("portfolioId") portfolioId: string) {
    return this.portfoliosService.getMetrics(portfolioId);
  }

  @Get(":portfolioId/risk")
  getRisk(@Param("portfolioId") portfolioId: string) {
    return this.portfoliosService.getRisk(portfolioId);
  }

  @Get(":portfolioId/comparison")
  getComparison(@Param("portfolioId") portfolioId: string) {
    return this.portfoliosService.getComparison(portfolioId);
  }

  @Post(":portfolioId/simulate")
  simulate(@Param("portfolioId") portfolioId: string, @Body() body: PortfolioAllocationInput[]) {
    return this.portfoliosService.simulate(portfolioId, body);
  }
}
