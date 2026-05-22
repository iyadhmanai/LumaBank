import type { AuditLog, CreateAuditLogInput } from "./audit.js";
import type { EntityId, IsoDateTimeString } from "../shared/types.js";

type AuditLogFactoryOptions = {
  now?: () => IsoDateTimeString;
  createId?: () => EntityId;
};

const defaultNow = (): IsoDateTimeString => new Date().toISOString();
const defaultCreateId = (): EntityId => globalThis.crypto.randomUUID();

export const createAuditLog = (
  input: CreateAuditLogInput,
  options: AuditLogFactoryOptions = {}
): AuditLog => {
  const createId = options.createId ?? defaultCreateId;
  const now = options.now ?? defaultNow;

  return {
    ...input,
    id: input.id ?? createId(),
    createdAt: input.createdAt ?? now()
  };
};
