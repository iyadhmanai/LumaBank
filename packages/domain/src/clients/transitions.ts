import type { ClientStatus } from "./client.js";

const allowedClientStatusTransitions: Record<ClientStatus, readonly ClientStatus[]> = {
  PENDING_KYC: ["ACTIVE", "SUSPENDED", "CLOSED"],
  ACTIVE: ["SUSPENDED", "CLOSED"],
  SUSPENDED: ["ACTIVE", "CLOSED"],
  CLOSED: []
};

export const canTransitionClientStatus = (from: ClientStatus, to: ClientStatus): boolean => {
  return allowedClientStatusTransitions[from].includes(to);
};

export const assertClientStatusTransition = (from: ClientStatus, to: ClientStatus): void => {
  if (!canTransitionClientStatus(from, to)) {
    throw new Error(`Invalid client status transition: ${from} -> ${to}.`);
  }
};
