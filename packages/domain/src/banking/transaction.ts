import type { EntityId, IsoDateString, IsoDateTimeString } from "../shared/types.js";
import type { Money } from "../money/money.js";

export type TransactionDirection = "INCOMING" | "OUTGOING";
export type TransactionStatus = "PENDING" | "BOOKED" | "REJECTED";

export type TransactionCategory =
  | "GROCERIES"
  | "RESTAURANTS"
  | "TRANSPORT"
  | "RENT"
  | "UTILITIES"
  | "SHOPPING"
  | "TRAVEL"
  | "ENTERTAINMENT"
  | "HEALTHCARE"
  | "INSURANCE"
  | "SUBSCRIPTIONS"
  | "TAXES"
  | "SALARY"
  | "TRANSFERS"
  | "INVESTMENT"
  | "OTHER";

export type Transaction = {
  id: EntityId;
  accountId: EntityId;
  amount: Money;
  direction: TransactionDirection;
  bookingDate: IsoDateString;
  valueDate?: IsoDateString;
  merchantName?: string;
  counterpartyName?: string;
  counterpartyIban?: string;
  remittanceInformation?: string;
  category?: TransactionCategory;
  status: TransactionStatus;
  createdAt: IsoDateTimeString;
};
