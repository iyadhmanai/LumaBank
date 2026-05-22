import type { CurrencyCode } from "../shared/types.js";

export type Money = {
  amountMinor: number;
  currency: CurrencyCode;
};

export const createMoney = (amountMinor: number, currency: CurrencyCode = "EUR"): Money => {
  if (!Number.isInteger(amountMinor)) {
    throw new Error("Money amount must use integer minor units.");
  }

  return { amountMinor, currency };
};

export const assertSameCurrency = (left: Money, right: Money): void => {
  if (left.currency !== right.currency) {
    throw new Error(
      `Currency mismatch: ${left.currency} cannot be combined with ${right.currency}.`
    );
  }
};

export const addMoney = (left: Money, right: Money): Money => {
  assertSameCurrency(left, right);
  return createMoney(left.amountMinor + right.amountMinor, left.currency);
};

export const subtractMoney = (left: Money, right: Money): Money => {
  assertSameCurrency(left, right);
  return createMoney(left.amountMinor - right.amountMinor, left.currency);
};

export const isPositiveMoney = (money: Money): boolean => money.amountMinor > 0;
