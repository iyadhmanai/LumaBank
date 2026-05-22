import { describe, expect, it } from "vitest";
import { assertOrderStatusTransition, canTransitionOrderStatus } from "./transitions.js";

describe("order status transitions", () => {
  it("allows the happy path from draft to settlement", () => {
    expect(canTransitionOrderStatus("DRAFT", "PENDING_CLIENT_CONFIRMATION")).toBe(true);
    expect(canTransitionOrderStatus("PENDING_CLIENT_CONFIRMATION", "PENDING_SCA")).toBe(true);
    expect(canTransitionOrderStatus("PENDING_SCA", "SUBMITTED")).toBe(true);
    expect(canTransitionOrderStatus("SUBMITTED", "ACCEPTED")).toBe(true);
    expect(canTransitionOrderStatus("ACCEPTED", "EXECUTED")).toBe(true);
    expect(canTransitionOrderStatus("EXECUTED", "SETTLED")).toBe(true);
  });

  it("allows cancellation before final states", () => {
    expect(canTransitionOrderStatus("DRAFT", "CANCELLED")).toBe(true);
    expect(canTransitionOrderStatus("PENDING_SCA", "CANCELLED")).toBe(true);
  });

  it("blocks transitions out of final states", () => {
    expect(canTransitionOrderStatus("SETTLED", "FAILED")).toBe(false);
    expect(() => assertOrderStatusTransition("SETTLED", "FAILED")).toThrow(
      "Invalid order status transition"
    );
  });
});
