import { addMoney, createMoney } from "../money/money.js";
import type { Money } from "../money/money.js";
import type { Transaction, TransactionCategory } from "./transaction.js";

export type SpendingCategorySummary = {
  category: TransactionCategory;
  amount: Money;
  transactionCount: number;
};

export type MonthlyCashflowSummary = {
  income: Money;
  expenses: Money;
  net: Money;
};

const isBookedOutgoing = (transaction: Transaction): boolean => {
  return transaction.status === "BOOKED" && transaction.direction === "OUTGOING";
};

const isBookedIncoming = (transaction: Transaction): boolean => {
  return transaction.status === "BOOKED" && transaction.direction === "INCOMING";
};

export const summarizeSpendingByCategory = (
  transactions: readonly Transaction[]
): SpendingCategorySummary[] => {
  const summaries = new Map<TransactionCategory, SpendingCategorySummary>();

  for (const transaction of transactions) {
    if (!isBookedOutgoing(transaction)) {
      continue;
    }

    const category = transaction.category ?? "OTHER";
    const current =
      summaries.get(category) ??
      ({
        category,
        amount: createMoney(0, transaction.amount.currency),
        transactionCount: 0
      } satisfies SpendingCategorySummary);

    summaries.set(category, {
      category,
      amount: addMoney(current.amount, transaction.amount),
      transactionCount: current.transactionCount + 1
    });
  }

  return [...summaries.values()].sort(
    (left, right) => right.amount.amountMinor - left.amount.amountMinor
  );
};

export const calculateMonthlyCashflow = (
  transactions: readonly Transaction[],
  currency = "EUR"
): MonthlyCashflowSummary => {
  const income = transactions
    .filter(isBookedIncoming)
    .reduce((total, transaction) => addMoney(total, transaction.amount), createMoney(0, currency));

  const expenses = transactions
    .filter(isBookedOutgoing)
    .reduce((total, transaction) => addMoney(total, transaction.amount), createMoney(0, currency));

  return {
    income,
    expenses,
    net: createMoney(income.amountMinor - expenses.amountMinor, income.currency)
  };
};
