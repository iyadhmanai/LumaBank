import type { Instrument } from "@luma-bank/domain/investments";
import {
  calculatePortfolioMetric,
  createConcentrationWarnings,
  groupAllocationByAssetClass,
  type PortfolioAllocationInput
} from "@luma-bank/domain/portfolios";
import { instruments } from "../../investments/lib/investment-catalogue-data";

export const builderInstruments: Instrument[] = instruments.filter((instrument) =>
  [
    "instrument-msci-world",
    "instrument-euro-corp-bond",
    "instrument-money-market",
    "instrument-healthcare",
    "instrument-clean-energy"
  ].includes(instrument.id)
);

export const initialAllocations: PortfolioAllocationInput[] = [
  { instrumentId: "instrument-msci-world", targetWeightBasisPoints: 4500 },
  { instrumentId: "instrument-euro-corp-bond", targetWeightBasisPoints: 2500 },
  { instrumentId: "instrument-money-market", targetWeightBasisPoints: 1500 },
  { instrumentId: "instrument-healthcare", targetWeightBasisPoints: 1500 },
  { instrumentId: "instrument-clean-energy", targetWeightBasisPoints: 0 }
];

export const formatPercent = (value?: number): string => {
  if (value === undefined) return "-";

  return new Intl.NumberFormat("en-DE", {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(value);
};

export const formatBasisPoints = (basisPoints: number): string => {
  return `${(basisPoints / 100).toFixed(0)}%`;
};

export const calculateBuilderState = (allocations: PortfolioAllocationInput[]) => {
  const metric = calculatePortfolioMetric(
    "portfolio-draft-001",
    allocations,
    builderInstruments,
    "2026-05-24T10:00:00.000Z"
  );
  const warnings = createConcentrationWarnings(
    "portfolio-draft-001",
    allocations,
    "2026-05-24T10:00:00.000Z"
  );
  const allocationByAssetClass = groupAllocationByAssetClass(allocations, builderInstruments);
  const totalBasisPoints = allocations.reduce(
    (total, allocation) => total + allocation.targetWeightBasisPoints,
    0
  );

  return {
    metric,
    warnings,
    allocationByAssetClass,
    totalBasisPoints,
    remainingBasisPoints: 10_000 - totalBasisPoints
  };
};
