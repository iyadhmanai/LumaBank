import { createMoney, type BankAccount, type Transaction } from "@luma-bank/domain";

export const mockClientId = "client-demo-001";

export const mockAccounts: BankAccount[] = [
  {
    id: "account-current-001",
    clientId: mockClientId,
    iban: "DE89370400440532013000",
    accountType: "CURRENT",
    availableBalance: createMoney(684250),
    bookedBalance: createMoney(681000),
    status: "ACTIVE",
    createdAt: "2026-01-02T09:00:00.000Z",
    updatedAt: "2026-05-22T08:30:00.000Z"
  },
  {
    id: "account-savings-001",
    clientId: mockClientId,
    iban: "DE12500105170648489890",
    accountType: "SAVINGS",
    availableBalance: createMoney(1285000),
    bookedBalance: createMoney(1285000),
    status: "ACTIVE",
    createdAt: "2026-01-02T09:15:00.000Z",
    updatedAt: "2026-05-22T08:30:00.000Z"
  },
  {
    id: "account-invest-cash-001",
    clientId: mockClientId,
    iban: "DE75512108001245126199",
    accountType: "INVESTMENT_CASH",
    availableBalance: createMoney(245000),
    bookedBalance: createMoney(245000),
    status: "ACTIVE",
    createdAt: "2026-02-10T10:00:00.000Z",
    updatedAt: "2026-05-22T08:30:00.000Z"
  }
];

export const mockTransactions: Transaction[] = [
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

export const mockRecurringPayments = [
  {
    id: "recurring-rent",
    name: "Urban Living SE",
    category: "RENT",
    amount: createMoney(138000),
    cadence: "MONTHLY",
    nextExpectedDate: "2026-06-03"
  },
  {
    id: "recurring-utilities",
    name: "Berlin Energie",
    category: "UTILITIES",
    amount: createMoney(18600),
    cadence: "MONTHLY",
    nextExpectedDate: "2026-06-11"
  },
  {
    id: "recurring-investment",
    name: "Luma Investments",
    category: "INVESTMENT",
    amount: createMoney(50000),
    cadence: "MONTHLY",
    nextExpectedDate: "2026-06-15"
  }
] as const;

export const mockBudgets = [
  {
    id: "budget-groceries",
    category: "GROCERIES",
    limit: createMoney(45000),
    spent: createMoney(6420)
  },
  {
    id: "budget-restaurants",
    category: "RESTAURANTS",
    limit: createMoney(30000),
    spent: createMoney(4850)
  },
  {
    id: "budget-transport",
    category: "TRANSPORT",
    limit: createMoney(15000),
    spent: createMoney(1290)
  }
] as const;
