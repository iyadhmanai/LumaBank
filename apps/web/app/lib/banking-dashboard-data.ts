import {
  calculateMonthlyCashflow,
  summarizeSpendingByCategory,
  type BankAccount,
  type Transaction
} from "@luma-bank/domain/banking";
import { createMoney, type Money } from "@luma-bank/domain/money";

export const formatMoney = (money: Money): string => {
  return new Intl.NumberFormat("en-DE", {
    style: "currency",
    currency: money.currency,
    minimumFractionDigits: 2
  }).format(money.amountMinor / 100);
};

export const accounts: BankAccount[] = [
  {
    id: "account-current-001",
    clientId: "client-demo-001",
    iban: "DE89 3704 0044 0532 0130 00",
    accountType: "CURRENT",
    availableBalance: createMoney(684250),
    bookedBalance: createMoney(681000),
    status: "ACTIVE",
    createdAt: "2026-01-02T09:00:00.000Z",
    updatedAt: "2026-05-22T08:30:00.000Z"
  },
  {
    id: "account-savings-001",
    clientId: "client-demo-001",
    iban: "DE12 5001 0517 0648 4898 90",
    accountType: "SAVINGS",
    availableBalance: createMoney(1285000),
    bookedBalance: createMoney(1285000),
    status: "ACTIVE",
    createdAt: "2026-01-02T09:15:00.000Z",
    updatedAt: "2026-05-22T08:30:00.000Z"
  },
  {
    id: "account-invest-cash-001",
    clientId: "client-demo-001",
    iban: "DE75 5121 0800 1245 1261 99",
    accountType: "INVESTMENT_CASH",
    availableBalance: createMoney(245000),
    bookedBalance: createMoney(245000),
    status: "ACTIVE",
    createdAt: "2026-02-10T10:00:00.000Z",
    updatedAt: "2026-05-22T08:30:00.000Z"
  }
];

export const transactions: Transaction[] = [
  {
    id: "transaction-salary-may",
    accountId: "account-current-001",
    amount: createMoney(420000),
    direction: "INCOMING",
    bookingDate: "2026-05-01",
    counterpartyName: "Luma Labs GmbH",
    remittanceInformation: "Salary May 2026",
    category: "SALARY",
    status: "BOOKED",
    createdAt: "2026-05-01T07:42:00.000Z"
  },
  {
    id: "transaction-rent-may",
    accountId: "account-current-001",
    amount: createMoney(138000),
    direction: "OUTGOING",
    bookingDate: "2026-05-03",
    counterpartyName: "Urban Living SE",
    remittanceInformation: "Rent May 2026",
    category: "RENT",
    status: "BOOKED",
    createdAt: "2026-05-03T09:12:00.000Z"
  },
  {
    id: "transaction-market",
    accountId: "account-current-001",
    amount: createMoney(6420),
    direction: "OUTGOING",
    bookingDate: "2026-05-05",
    merchantName: "Rewe Mitte",
    category: "GROCERIES",
    status: "BOOKED",
    createdAt: "2026-05-05T18:20:00.000Z"
  },
  {
    id: "transaction-train",
    accountId: "account-current-001",
    amount: createMoney(1290),
    direction: "OUTGOING",
    bookingDate: "2026-05-06",
    merchantName: "Deutsche Bahn",
    category: "TRANSPORT",
    status: "BOOKED",
    createdAt: "2026-05-06T08:06:00.000Z"
  },
  {
    id: "transaction-restaurant",
    accountId: "account-current-001",
    amount: createMoney(4850),
    direction: "OUTGOING",
    bookingDate: "2026-05-09",
    merchantName: "Nori Kitchen",
    category: "RESTAURANTS",
    status: "BOOKED",
    createdAt: "2026-05-09T20:33:00.000Z"
  },
  {
    id: "transaction-utilities",
    accountId: "account-current-001",
    amount: createMoney(18600),
    direction: "OUTGOING",
    bookingDate: "2026-05-11",
    counterpartyName: "Berlin Energie",
    category: "UTILITIES",
    status: "BOOKED",
    createdAt: "2026-05-11T06:02:00.000Z"
  },
  {
    id: "transaction-etf-transfer",
    accountId: "account-invest-cash-001",
    amount: createMoney(50000),
    direction: "OUTGOING",
    bookingDate: "2026-05-15",
    counterpartyName: "Luma Investments",
    category: "INVESTMENT",
    status: "BOOKED",
    createdAt: "2026-05-15T11:30:00.000Z"
  },
  {
    id: "transaction-card-pending",
    accountId: "account-current-001",
    amount: createMoney(3590),
    direction: "OUTGOING",
    bookingDate: "2026-05-22",
    merchantName: "City Apotheke",
    category: "HEALTHCARE",
    status: "PENDING",
    createdAt: "2026-05-22T13:05:00.000Z"
  }
];

export const recurringPayments = [
  {
    id: "recurring-rent",
    name: "Urban Living SE",
    amount: createMoney(138000),
    nextExpectedDate: "2026-06-03"
  },
  {
    id: "recurring-utilities",
    name: "Berlin Energie",
    amount: createMoney(18600),
    nextExpectedDate: "2026-06-11"
  },
  {
    id: "recurring-investment",
    name: "Luma Investments",
    amount: createMoney(50000),
    nextExpectedDate: "2026-06-15"
  }
] as const;

export const budgets = [
  {
    id: "budget-groceries",
    label: "Groceries",
    limit: createMoney(45000),
    spent: createMoney(6420)
  },
  {
    id: "budget-restaurants",
    label: "Restaurants",
    limit: createMoney(30000),
    spent: createMoney(4850)
  },
  {
    id: "budget-transport",
    label: "Transport",
    limit: createMoney(15000),
    spent: createMoney(1290)
  }
] as const;

export const totalAvailableBalance = accounts.reduce(
  (total, account) => createMoney(total.amountMinor + account.availableBalance.amountMinor),
  createMoney(0)
);

export const monthlyCashflow = calculateMonthlyCashflow(transactions);
export const spendingByCategory = summarizeSpendingByCategory(transactions);
