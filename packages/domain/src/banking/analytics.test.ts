import { describe, expect, it } from "vitest";
import { createMoney } from "../money/money.js";
import type { Transaction } from "./transaction.js";
import { calculateMonthlyCashflow, summarizeSpendingByCategory } from "./analytics.js";

const transaction = (overrides: Partial<Transaction>): Transaction => ({
  id: "transaction-1",
  accountId: "account-1",
  amount: createMoney(1000),
  direction: "OUTGOING",
  bookingDate: "2026-05-01",
  category: "OTHER",
  status: "BOOKED",
  createdAt: "2026-05-01T08:00:00.000Z",
  ...overrides
});

describe("banking analytics", () => {
  it("summarizes booked outgoing spending by category", () => {
    const summary = summarizeSpendingByCategory([
      transaction({ id: "groceries-1", amount: createMoney(4500), category: "GROCERIES" }),
      transaction({ id: "rent-1", amount: createMoney(120000), category: "RENT" }),
      transaction({
        id: "pending-1",
        amount: createMoney(9999),
        category: "SHOPPING",
        status: "PENDING"
      }),
      transaction({
        id: "salary-1",
        amount: createMoney(350000),
        direction: "INCOMING",
        category: "SALARY"
      }),
      transaction({ id: "groceries-2", amount: createMoney(1800), category: "GROCERIES" })
    ]);

    expect(summary).toEqual([
      {
        category: "RENT",
        amount: createMoney(120000),
        transactionCount: 1
      },
      {
        category: "GROCERIES",
        amount: createMoney(6300),
        transactionCount: 2
      }
    ]);
  });

  it("calculates income, expenses, and net cash flow from booked transactions", () => {
    expect(
      calculateMonthlyCashflow([
        transaction({ id: "salary", direction: "INCOMING", amount: createMoney(350000) }),
        transaction({ id: "rent", direction: "OUTGOING", amount: createMoney(120000) }),
        transaction({ id: "groceries", direction: "OUTGOING", amount: createMoney(30000) }),
        transaction({
          id: "pending-card",
          direction: "OUTGOING",
          amount: createMoney(40000),
          status: "PENDING"
        })
      ])
    ).toEqual({
      income: createMoney(350000),
      expenses: createMoney(150000),
      net: createMoney(200000)
    });
  });
});
