import { describe, expect, it } from "vitest";
import type { Instrument } from "../investments/instrument.js";
import {
  calculatePortfolioMetric,
  createConcentrationWarnings,
  groupAllocationByAssetClass
} from "./metrics.js";

const instruments: Instrument[] = [
  {
    id: "equity-global",
    isin: "IE00B4L5Y983",
    name: "Global Equity ETF",
    instrumentType: "ETF",
    currency: "EUR",
    issuerName: "Issuer",
    assetClass: "Equity",
    riskScore: 4,
    expectedReturnAnnual: 0.06,
    volatilityAnnual: 0.14,
    maxDrawdown: -0.3,
    isComplex: false,
    isAvailableForRetail: true,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z"
  },
  {
    id: "bond-euro",
    isin: "IE00B3F81R35",
    name: "Euro Bond ETF",
    instrumentType: "ETF",
    currency: "EUR",
    issuerName: "Issuer",
    assetClass: "Bond",
    riskScore: 2,
    expectedReturnAnnual: 0.02,
    volatilityAnnual: 0.05,
    maxDrawdown: -0.1,
    isComplex: false,
    isAvailableForRetail: true,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z"
  }
];

describe("portfolio metrics", () => {
  it("calculates weighted risk and return placeholders", () => {
    expect(
      calculatePortfolioMetric(
        "portfolio-1",
        [
          { instrumentId: "equity-global", targetWeightBasisPoints: 6000 },
          { instrumentId: "bond-euro", targetWeightBasisPoints: 4000 }
        ],
        instruments,
        "2026-05-24T10:00:00.000Z"
      )
    ).toMatchObject({
      expectedAnnualReturn: 0.044,
      annualizedVolatility: 0.104,
      maxDrawdown: -0.22,
      riskLevel: 3
    });
  });

  it("groups allocations by asset class", () => {
    expect(
      groupAllocationByAssetClass(
        [
          { instrumentId: "equity-global", targetWeightBasisPoints: 6000 },
          { instrumentId: "bond-euro", targetWeightBasisPoints: 4000 }
        ],
        instruments
      )
    ).toEqual([
      { label: "Equity", targetWeightBasisPoints: 6000 },
      { label: "Bond", targetWeightBasisPoints: 4000 }
    ]);
  });

  it("creates concentration warnings above threshold", () => {
    expect(
      createConcentrationWarnings(
        "portfolio-1",
        [
          { instrumentId: "equity-global", targetWeightBasisPoints: 5200 },
          { instrumentId: "bond-euro", targetWeightBasisPoints: 4800 }
        ],
        "2026-05-24T10:00:00.000Z"
      )
    ).toHaveLength(2);
  });
});
