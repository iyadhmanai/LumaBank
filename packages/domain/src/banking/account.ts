import type { EntityId, IsoDateTimeString } from "../shared/types.js";
import type { Money } from "../money/money.js";

export type AccountStatus = "ACTIVE" | "BLOCKED" | "CLOSED";
export type AccountType = "CURRENT" | "SAVINGS" | "INVESTMENT_CASH";

export type BankAccount = {
  id: EntityId;
  clientId: EntityId;
  iban: string;
  accountType: AccountType;
  availableBalance: Money;
  bookedBalance: Money;
  status: AccountStatus;
  createdAt: IsoDateTimeString;
  updatedAt: IsoDateTimeString;
};
