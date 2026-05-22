import type { EntityId, IsoDateTimeString } from "../shared/types.js";

export type SuitabilityResultType =
  | "SUITABLE"
  | "NOT_SUITABLE"
  | "APPROPRIATENESS_WARNING"
  | "BLOCKED";

export type SuitabilityResult = {
  id: EntityId;
  clientId: EntityId;
  portfolioId?: EntityId;
  instrumentId?: EntityId;
  orderId?: EntityId;
  result: SuitabilityResultType;
  reasons: string[];
  warnings: string[];
  createdAt: IsoDateTimeString;
};
