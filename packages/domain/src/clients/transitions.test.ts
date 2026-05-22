import { describe, expect, it } from "vitest";
import { assertClientStatusTransition, canTransitionClientStatus } from "./transitions.js";

describe("client status transitions", () => {
  it("allows onboarding approval", () => {
    expect(canTransitionClientStatus("PENDING_KYC", "ACTIVE")).toBe(true);
  });

  it("allows suspended clients to be reactivated", () => {
    expect(canTransitionClientStatus("SUSPENDED", "ACTIVE")).toBe(true);
  });

  it("blocks reopening closed clients", () => {
    expect(canTransitionClientStatus("CLOSED", "ACTIVE")).toBe(false);
    expect(() => assertClientStatusTransition("CLOSED", "ACTIVE")).toThrow(
      "Invalid client status transition"
    );
  });
});
