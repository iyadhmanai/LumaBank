import type { EntityId, IsoDateString, IsoDateTimeString } from "../shared/types.js";

export type RiskLevel = 1 | 2 | 3 | 4 | 5;
export type KnowledgeLevel = "NONE" | "BASIC" | "INTERMEDIATE" | "ADVANCED";
export type InvestmentObjective = "CAPITAL_PRESERVATION" | "INCOME" | "GROWTH" | "SPECULATION";
export type LossCapacity = "LOW" | "MEDIUM" | "HIGH";
export type ClientClassification = "RETAIL" | "PROFESSIONAL" | "ELIGIBLE_COUNTERPARTY";

export type InvestmentProfile = {
  id: EntityId;
  clientId: EntityId;
  riskLevel: RiskLevel;
  knowledgeLevel: KnowledgeLevel;
  investmentObjective: InvestmentObjective;
  timeHorizonYears: number;
  lossCapacity: LossCapacity;
  sustainabilityPreferences?: string[];
  clientClassification: ClientClassification;
  validUntil: IsoDateString;
  createdAt: IsoDateTimeString;
};
