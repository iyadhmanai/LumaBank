import type { EntityId, IsoDateTimeString } from "../shared/types.js";
import type { Money } from "../money/money.js";
import type { SuitabilityResult } from "../investments/suitability.js";

export type OrderSide = "BUY" | "SELL";

export type OrderStatus =
  | "DRAFT"
  | "PENDING_CLIENT_CONFIRMATION"
  | "PENDING_SCA"
  | "SUBMITTED"
  | "ACCEPTED"
  | "PARTIALLY_EXECUTED"
  | "EXECUTED"
  | "REJECTED"
  | "CANCELLED"
  | "SETTLED"
  | "FAILED";

export type FeeBreakdown = {
  serviceFee: Money;
  productFee?: Money;
  thirdPartyFee?: Money;
  totalFee: Money;
};

export type ClientWarning = {
  code: string;
  message: string;
  acceptedAt?: IsoDateTimeString;
};

export type OrderPreview = {
  id: EntityId;
  clientId: EntityId;
  portfolioId: EntityId;
  instrumentId: EntityId;
  side: OrderSide;
  estimatedGrossAmount: Money;
  estimatedNetAmount: Money;
  fees: FeeBreakdown;
  suitabilityResult: SuitabilityResult;
  warnings: ClientWarning[];
  createdAt: IsoDateTimeString;
};

export type InvestmentOrder = {
  id: EntityId;
  clientId: EntityId;
  portfolioId: EntityId;
  instrumentId: EntityId;
  side: OrderSide;
  status: OrderStatus;
  requestedAmount: Money;
  quantity?: number;
  previewId?: EntityId;
  createdAt: IsoDateTimeString;
  updatedAt: IsoDateTimeString;
};

export type Settlement = {
  id: EntityId;
  orderId: EntityId;
  status: "PENDING" | "SETTLED" | "FAILED";
  settlementDate?: string;
  createdAt: IsoDateTimeString;
  updatedAt: IsoDateTimeString;
};
