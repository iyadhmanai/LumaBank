import type { EntityId, IsoDateTimeString } from "../shared/types.js";

export type AuditActorType = "CLIENT" | "ADMIN" | "SYSTEM" | "SERVICE";

export type AuditEventType =
  | "LOGIN_SUCCEEDED"
  | "LOGIN_FAILED"
  | "DEVICE_REGISTERED"
  | "CLIENT_PROFILE_VIEWED"
  | "ADMIN_DATA_ACCESSED"
  | "TRANSACTION_CATEGORY_CHANGED"
  | "INSTRUMENT_UPDATED"
  | "PORTFOLIO_UPDATED"
  | "ORDER_PREVIEWED"
  | "ORDER_CONFIRMED"
  | "SUITABILITY_WARNING_SHOWN"
  | "CLIENT_ACCEPTED_WARNING";

export type AuditEntityType =
  | "AUTH_SESSION"
  | "DEVICE"
  | "CLIENT"
  | "BANK_ACCOUNT"
  | "TRANSACTION"
  | "INSTRUMENT"
  | "PORTFOLIO"
  | "ORDER"
  | "SUITABILITY_RESULT"
  | "MODEL_PORTFOLIO"
  | "ADMIN_USER";

export type AuditLog = {
  id: EntityId;
  actorId: EntityId;
  actorType: AuditActorType;
  eventType: AuditEventType;
  entityType: AuditEntityType;
  entityId?: EntityId;
  metadata?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: IsoDateTimeString;
};

export type CreateAuditLogInput = Omit<AuditLog, "id" | "createdAt"> & {
  id?: EntityId;
  createdAt?: IsoDateTimeString;
};
