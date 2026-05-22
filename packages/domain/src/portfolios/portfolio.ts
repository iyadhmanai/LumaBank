import type {
  BasisPoints,
  CurrencyCode,
  EntityId,
  IsoDateTimeString,
  PercentageDecimal
} from "../shared/types.js";
import type { Money } from "../money/money.js";

export type PortfolioStatus = "DRAFT" | "ACTIVE" | "CLOSED";
export type PortfolioType = "SELF_DIRECTED" | "MODEL_BASED";
export type RiskWarningSeverity = "INFO" | "WARNING" | "BLOCKING";

export type Portfolio = {
  id: EntityId;
  clientId: EntityId;
  name: string;
  portfolioType: PortfolioType;
  baseCurrency: CurrencyCode;
  status: PortfolioStatus;
  createdAt: IsoDateTimeString;
  updatedAt: IsoDateTimeString;
};

export type PortfolioHolding = {
  id: EntityId;
  portfolioId: EntityId;
  instrumentId: EntityId;
  quantity: number;
  averageCost: Money;
  marketValue: Money;
  weightBasisPoints: BasisPoints;
  unrealizedPnl: Money;
  createdAt: IsoDateTimeString;
  updatedAt: IsoDateTimeString;
};

export type PortfolioMetric = {
  portfolioId: EntityId;
  totalValue: Money;
  profitAndLoss: Money;
  timeWeightedReturn?: PercentageDecimal;
  moneyWeightedReturn?: PercentageDecimal;
  expectedAnnualReturn?: PercentageDecimal;
  annualizedVolatility?: PercentageDecimal;
  maxDrawdown?: PercentageDecimal;
  sharpeRatio?: number;
  riskLevel?: number;
  calculatedAt: IsoDateTimeString;
};

export type PortfolioRiskWarning = {
  id: EntityId;
  portfolioId: EntityId;
  severity: RiskWarningSeverity;
  code: string;
  message: string;
  createdAt: IsoDateTimeString;
};
