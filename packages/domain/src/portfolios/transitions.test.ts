import { describe, expect, it } from "vitest";
import { assertPortfolioStatusTransition, canTransitionPortfolioStatus } from "./transitions.js";

describe("portfolio status transitions", () => {
  it("allows activating a draft portfolio", () => {
    expect(canTransitionPortfolioStatus("DRAFT", "ACTIVE")).toBe(true);
  });

  it("allows closing active portfolios", () => {
    expect(canTransitionPortfolioStatus("ACTIVE", "CLOSED")).toBe(true);
  });

  it("blocks reopening closed portfolios", () => {
    expect(canTransitionPortfolioStatus("CLOSED", "ACTIVE")).toBe(false);
    expect(() => assertPortfolioStatusTransition("CLOSED", "ACTIVE")).toThrow(
      "Invalid portfolio status transition"
    );
  });
});
