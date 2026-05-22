import type {
  CurrencyCode,
  EntityId,
  IsoDateTimeString,
  PercentageDecimal
} from "../shared/types.js";

export type InstrumentType =
  | "ETF"
  | "FUND"
  | "BOND"
  | "EQUITY"
  | "STRUCTURED_PRODUCT"
  | "MONEY_MARKET_FUND"
  | "INDEX_TRACKER";

export type Instrument = {
  id: EntityId;
  isin: string;
  name: string;
  instrumentType: InstrumentType;
  currency: CurrencyCode;
  issuerName: string;
  assetClass: string;
  region?: string;
  sector?: string;
  riskScore: number;
  sriScore?: number;
  expectedReturnAnnual?: PercentageDecimal;
  volatilityAnnual?: PercentageDecimal;
  maxDrawdown?: PercentageDecimal;
  ongoingCharges?: PercentageDecimal;
  entryFee?: PercentageDecimal;
  exitFee?: PercentageDecimal;
  liquidityProfile?: string;
  isComplex: boolean;
  isAvailableForRetail: boolean;
  kidDocumentUrl?: string;
  factsheetUrl?: string;
  prospectusUrl?: string;
  benchmarkId?: EntityId;
  createdAt: IsoDateTimeString;
  updatedAt: IsoDateTimeString;
};
