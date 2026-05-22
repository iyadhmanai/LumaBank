import type { BasisPoints, EntityId, IsoDateTimeString } from "../shared/types.js";
import type { Money } from "../money/money.js";

export type RebalancingFrequency = "MONTHLY" | "QUARTERLY" | "SEMI_ANNUAL" | "ANNUAL";

export type ModelPortfolio = {
  id: EntityId;
  name: string;
  description: string;
  riskLevel: 1 | 2 | 3 | 4 | 5;
  currentVersionId: EntityId;
  minimumInvestment: Money;
  createdAt: IsoDateTimeString;
  updatedAt: IsoDateTimeString;
};

export type ModelPortfolioVersion = {
  id: EntityId;
  modelPortfolioId: EntityId;
  version: number;
  approvedBy: EntityId;
  approvedAt: IsoDateTimeString;
  rebalancingFrequency: RebalancingFrequency;
  createdAt: IsoDateTimeString;
};

export type ModelPortfolioAllocation = {
  id: EntityId;
  modelPortfolioVersionId: EntityId;
  instrumentId: EntityId;
  targetWeightBasisPoints: BasisPoints;
};
