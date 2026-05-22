import type { OrderStatus } from "./order.js";

const allowedOrderStatusTransitions: Record<OrderStatus, readonly OrderStatus[]> = {
  DRAFT: ["PENDING_CLIENT_CONFIRMATION", "CANCELLED"],
  PENDING_CLIENT_CONFIRMATION: ["PENDING_SCA", "CANCELLED"],
  PENDING_SCA: ["SUBMITTED", "FAILED", "CANCELLED"],
  SUBMITTED: ["ACCEPTED", "REJECTED", "FAILED"],
  ACCEPTED: ["PARTIALLY_EXECUTED", "EXECUTED", "CANCELLED", "FAILED"],
  PARTIALLY_EXECUTED: ["EXECUTED", "CANCELLED", "FAILED"],
  EXECUTED: ["SETTLED", "FAILED"],
  REJECTED: [],
  CANCELLED: [],
  SETTLED: [],
  FAILED: []
};

export const canTransitionOrderStatus = (from: OrderStatus, to: OrderStatus): boolean => {
  return allowedOrderStatusTransitions[from].includes(to);
};

export const assertOrderStatusTransition = (from: OrderStatus, to: OrderStatus): void => {
  if (!canTransitionOrderStatus(from, to)) {
    throw new Error(`Invalid order status transition: ${from} -> ${to}.`);
  }
};
