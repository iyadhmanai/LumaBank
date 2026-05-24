import { createMoney, type Instrument } from "@luma-bank/domain";
import type { Portfolio, PortfolioHolding } from "@luma-bank/domain/portfolios";
import { mockInstruments } from "../instruments/instruments.mock-data.js";

export const mockPortfolio: Portfolio = {
  id: "portfolio-draft-001",
  clientId: "client-demo-001",
  name: "Balanced Europe + Global Core",
  portfolioType: "SELF_DIRECTED",
  baseCurrency: "EUR",
  status: "DRAFT",
  createdAt: "2026-05-24T08:00:00.000Z",
  updatedAt: "2026-05-24T08:00:00.000Z"
};

export const mockPortfolioAllocations = [
  {
    instrumentId: "instrument-msci-world",
    targetWeightBasisPoints: 4500
  },
  {
    instrumentId: "instrument-euro-corp-bond",
    targetWeightBasisPoints: 2500
  },
  {
    instrumentId: "instrument-money-market",
    targetWeightBasisPoints: 1500
  },
  {
    instrumentId: "instrument-healthcare",
    targetWeightBasisPoints: 1500
  }
] as const;

export const mockPortfolioHoldings: PortfolioHolding[] = mockPortfolioAllocations.map(
  (allocation, index) => ({
    id: `holding-${index + 1}`,
    portfolioId: mockPortfolio.id,
    instrumentId: allocation.instrumentId,
    quantity: 10 + index * 3,
    averageCost: createMoney(10000 + index * 1100),
    marketValue: createMoney((allocation.targetWeightBasisPoints / 10_000) * 250000),
    weightBasisPoints: allocation.targetWeightBasisPoints,
    unrealizedPnl: createMoney(1200 - index * 300),
    createdAt: "2026-05-24T08:00:00.000Z",
    updatedAt: "2026-05-24T08:00:00.000Z"
  })
);

export const portfolioInstruments: Instrument[] = mockInstruments.filter((instrument) =>
  mockPortfolioAllocations.some((allocation) => allocation.instrumentId === instrument.id)
);
