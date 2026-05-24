import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import {
  calculatePortfolioMetric,
  createConcentrationWarnings,
  groupAllocationByAssetClass,
  validateFullAllocation,
  type PortfolioAllocationInput
} from "@luma-bank/domain/portfolios";
import { AuditService } from "../audit/audit.service.js";
import { mockInstruments } from "../instruments/instruments.mock-data.js";
import {
  mockPortfolio,
  mockPortfolioAllocations,
  mockPortfolioHoldings,
  portfolioInstruments
} from "./portfolios.mock-data.js";

@Injectable()
export class PortfoliosService {
  private allocations: PortfolioAllocationInput[] = [...mockPortfolioAllocations];

  constructor(@Inject(AuditService) private readonly auditService: AuditService) {}

  list() {
    return [mockPortfolio];
  }

  create() {
    this.auditService.record({
      actorId: mockPortfolio.clientId,
      actorType: "CLIENT",
      eventType: "PORTFOLIO_UPDATED",
      entityType: "PORTFOLIO",
      entityId: mockPortfolio.id,
      metadata: { action: "CREATE_DRAFT_PORTFOLIO" }
    });

    return mockPortfolio;
  }

  getById(portfolioId: string) {
    if (portfolioId !== mockPortfolio.id) {
      throw new NotFoundException(`Portfolio ${portfolioId} was not found.`);
    }

    return {
      ...mockPortfolio,
      holdings: mockPortfolioHoldings,
      allocations: this.allocations,
      instruments: portfolioInstruments
    };
  }

  addHolding(portfolioId: string, allocation: PortfolioAllocationInput) {
    this.getById(portfolioId);
    this.allocations = [
      ...this.allocations.filter((item) => item.instrumentId !== allocation.instrumentId),
      allocation
    ];
    this.recordPortfolioUpdate(portfolioId, "ADD_HOLDING", allocation);
    return this.getById(portfolioId);
  }

  updateHolding(portfolioId: string, holdingId: string, allocation: PortfolioAllocationInput) {
    this.getById(portfolioId);
    this.allocations = this.allocations.map((item) =>
      item.instrumentId === allocation.instrumentId ? allocation : item
    );
    this.recordPortfolioUpdate(portfolioId, "UPDATE_HOLDING", { holdingId, allocation });
    return this.getById(portfolioId);
  }

  removeHolding(portfolioId: string, holdingId: string) {
    this.getById(portfolioId);
    const holding = mockPortfolioHoldings.find((item) => item.id === holdingId);

    if (!holding) {
      throw new NotFoundException(`Holding ${holdingId} was not found.`);
    }

    this.allocations = this.allocations.filter(
      (item) => item.instrumentId !== holding.instrumentId
    );
    this.recordPortfolioUpdate(portfolioId, "REMOVE_HOLDING", { holdingId });
    return this.getById(portfolioId);
  }

  getMetrics(portfolioId: string) {
    this.getById(portfolioId);
    return calculatePortfolioMetric(
      portfolioId,
      this.allocations,
      mockInstruments,
      "2026-05-24T10:00:00.000Z"
    );
  }

  getRisk(portfolioId: string) {
    this.getById(portfolioId);

    return {
      warnings: createConcentrationWarnings(
        portfolioId,
        this.allocations,
        "2026-05-24T10:00:00.000Z"
      ),
      allocationByAssetClass: groupAllocationByAssetClass(this.allocations, mockInstruments)
    };
  }

  getComparison(portfolioId: string) {
    const metric = this.getMetrics(portfolioId);

    return {
      portfolioId,
      benchmarkName: "MSCI World",
      portfolioExpectedReturn: metric.expectedAnnualReturn,
      benchmarkExpectedReturn: 0.064,
      portfolioVolatility: metric.annualizedVolatility,
      benchmarkVolatility: 0.142
    };
  }

  simulate(portfolioId: string, allocations: PortfolioAllocationInput[]) {
    this.getById(portfolioId);
    validateFullAllocation(allocations);

    return {
      metrics: calculatePortfolioMetric(
        portfolioId,
        allocations,
        mockInstruments,
        "2026-05-24T10:00:00.000Z"
      ),
      risk: {
        warnings: createConcentrationWarnings(portfolioId, allocations, "2026-05-24T10:00:00.000Z"),
        allocationByAssetClass: groupAllocationByAssetClass(allocations, mockInstruments)
      }
    };
  }

  private recordPortfolioUpdate(
    portfolioId: string,
    action: string,
    metadata: Record<string, unknown>
  ) {
    this.auditService.record({
      actorId: mockPortfolio.clientId,
      actorType: "CLIENT",
      eventType: "PORTFOLIO_UPDATED",
      entityType: "PORTFOLIO",
      entityId: portfolioId,
      metadata: { action, ...metadata }
    });
  }
}
