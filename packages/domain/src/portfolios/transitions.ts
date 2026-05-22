import type { PortfolioStatus } from "./portfolio.js";

const allowedPortfolioStatusTransitions: Record<PortfolioStatus, readonly PortfolioStatus[]> = {
  DRAFT: ["ACTIVE", "CLOSED"],
  ACTIVE: ["CLOSED"],
  CLOSED: []
};

export const canTransitionPortfolioStatus = (
  from: PortfolioStatus,
  to: PortfolioStatus
): boolean => {
  return allowedPortfolioStatusTransitions[from].includes(to);
};

export const assertPortfolioStatusTransition = (
  from: PortfolioStatus,
  to: PortfolioStatus
): void => {
  if (!canTransitionPortfolioStatus(from, to)) {
    throw new Error(`Invalid portfolio status transition: ${from} -> ${to}.`);
  }
};
