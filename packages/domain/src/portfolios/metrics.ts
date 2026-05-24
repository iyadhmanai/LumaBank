import type { Instrument } from "../investments/instrument.js";
import { createMoney } from "../money/money.js";
import type { BasisPoints, EntityId, IsoDateTimeString } from "../shared/types.js";
import { FULL_ALLOCATION_BASIS_POINTS } from "./allocation.js";
import type { PortfolioMetric, PortfolioRiskWarning } from "./portfolio.js";

export type PortfolioAllocationInput = {
  instrumentId: EntityId;
  targetWeightBasisPoints: BasisPoints;
};

export type PortfolioAllocationExposure = {
  label: string;
  targetWeightBasisPoints: BasisPoints;
};

const weightedAverage = (
  allocations: readonly PortfolioAllocationInput[],
  instruments: readonly Instrument[],
  valueOf: (instrument: Instrument) => number | undefined
): number | undefined => {
  const weightedValues = allocations
    .map((allocation) => {
      const instrument = instruments.find((item) => item.id === allocation.instrumentId);
      const value = instrument ? valueOf(instrument) : undefined;

      if (value === undefined) {
        return undefined;
      }

      return value * (allocation.targetWeightBasisPoints / FULL_ALLOCATION_BASIS_POINTS);
    })
    .filter((value): value is number => value !== undefined);

  if (weightedValues.length === 0) {
    return undefined;
  }

  return Number(weightedValues.reduce((total, value) => total + value, 0).toFixed(6));
};

export const calculatePortfolioMetric = (
  portfolioId: EntityId,
  allocations: readonly PortfolioAllocationInput[],
  instruments: readonly Instrument[],
  calculatedAt: IsoDateTimeString
): PortfolioMetric => {
  const expectedAnnualReturn = weightedAverage(
    allocations,
    instruments,
    (instrument) => instrument.expectedReturnAnnual
  );
  const annualizedVolatility = weightedAverage(
    allocations,
    instruments,
    (instrument) => instrument.volatilityAnnual
  );
  const maxDrawdown = weightedAverage(
    allocations,
    instruments,
    (instrument) => instrument.maxDrawdown
  );
  const weightedRisk = weightedAverage(
    allocations,
    instruments,
    (instrument) => instrument.riskScore
  );

  const metric: PortfolioMetric = {
    portfolioId,
    totalValue: createMoney(0),
    profitAndLoss: createMoney(0),
    calculatedAt
  };

  if (expectedAnnualReturn !== undefined) metric.expectedAnnualReturn = expectedAnnualReturn;
  if (annualizedVolatility !== undefined) metric.annualizedVolatility = annualizedVolatility;
  if (maxDrawdown !== undefined) metric.maxDrawdown = maxDrawdown;
  if (weightedRisk !== undefined) metric.riskLevel = Math.round(weightedRisk);

  return metric;
};

export const groupAllocationByAssetClass = (
  allocations: readonly PortfolioAllocationInput[],
  instruments: readonly Instrument[]
): PortfolioAllocationExposure[] => {
  const groups = new Map<string, BasisPoints>();

  for (const allocation of allocations) {
    const instrument = instruments.find((item) => item.id === allocation.instrumentId);
    const label = instrument?.assetClass ?? "Unknown";
    groups.set(label, (groups.get(label) ?? 0) + allocation.targetWeightBasisPoints);
  }

  return [...groups.entries()]
    .map(([label, targetWeightBasisPoints]) => ({ label, targetWeightBasisPoints }))
    .sort((left, right) => right.targetWeightBasisPoints - left.targetWeightBasisPoints);
};

export const createConcentrationWarnings = (
  portfolioId: EntityId,
  allocations: readonly PortfolioAllocationInput[],
  createdAt: IsoDateTimeString,
  thresholdBasisPoints = 3_500
): PortfolioRiskWarning[] => {
  return allocations
    .filter((allocation) => allocation.targetWeightBasisPoints > thresholdBasisPoints)
    .map((allocation) => ({
      id: `${portfolioId}-${allocation.instrumentId}-concentration`,
      portfolioId,
      severity: allocation.targetWeightBasisPoints >= 5_000 ? "BLOCKING" : "WARNING",
      code: "CONCENTRATION_RISK",
      message: `Holding ${allocation.instrumentId} is above the ${thresholdBasisPoints / 100}% concentration threshold.`,
      createdAt
    }));
};
