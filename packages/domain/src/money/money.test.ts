import { describe, expect, it } from "vitest";
import { addMoney, createMoney, isPositiveMoney, subtractMoney } from "./money.js";

describe("money helpers", () => {
  it("creates EUR money using integer minor units", () => {
    expect(createMoney(1234)).toEqual({ amountMinor: 1234, currency: "EUR" });
  });

  it("rejects decimal minor units", () => {
    expect(() => createMoney(12.34)).toThrow("Money amount must use integer minor units.");
  });

  it("adds and subtracts money with the same currency", () => {
    expect(addMoney(createMoney(1000), createMoney(250))).toEqual({
      amountMinor: 1250,
      currency: "EUR"
    });
    expect(subtractMoney(createMoney(1000), createMoney(250))).toEqual({
      amountMinor: 750,
      currency: "EUR"
    });
  });

  it("rejects arithmetic across different currencies", () => {
    expect(() => addMoney(createMoney(1000, "EUR"), createMoney(1000, "USD"))).toThrow(
      "Currency mismatch"
    );
  });

  it("detects positive money", () => {
    expect(isPositiveMoney(createMoney(1))).toBe(true);
    expect(isPositiveMoney(createMoney(0))).toBe(false);
  });
});
