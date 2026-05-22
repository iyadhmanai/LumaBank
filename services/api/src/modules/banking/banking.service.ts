import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import {
  calculateMonthlyCashflow,
  summarizeSpendingByCategory,
  type TransactionCategory
} from "@luma-bank/domain";
import { AuditService } from "../audit/audit.service.js";
import {
  mockAccounts,
  mockBudgets,
  mockClientId,
  mockRecurringPayments,
  mockTransactions
} from "./banking.mock-data.js";

@Injectable()
export class BankingService {
  private readonly transactions = [...mockTransactions];

  constructor(@Inject(AuditService) private readonly auditService: AuditService) {}

  listAccounts() {
    return mockAccounts;
  }

  getAccount(accountId: string) {
    const account = mockAccounts.find((item) => item.id === accountId);

    if (!account) {
      throw new NotFoundException(`Account ${accountId} was not found.`);
    }

    return account;
  }

  getBalance(accountId: string) {
    const account = this.getAccount(accountId);

    return {
      accountId: account.id,
      availableBalance: account.availableBalance,
      bookedBalance: account.bookedBalance,
      updatedAt: account.updatedAt
    };
  }

  listTransactions(accountId: string) {
    this.getAccount(accountId);
    return this.transactions.filter((transaction) => transaction.accountId === accountId);
  }

  getTransaction(transactionId: string) {
    const transaction = this.transactions.find((item) => item.id === transactionId);

    if (!transaction) {
      throw new NotFoundException(`Transaction ${transactionId} was not found.`);
    }

    return transaction;
  }

  updateTransactionCategory(transactionId: string, category: TransactionCategory) {
    const index = this.transactions.findIndex((item) => item.id === transactionId);

    if (index === -1) {
      throw new NotFoundException(`Transaction ${transactionId} was not found.`);
    }

    const current = this.transactions[index];

    if (!current) {
      throw new NotFoundException(`Transaction ${transactionId} was not found.`);
    }

    const previousCategory = current.category;
    const updated = {
      ...current,
      category
    };
    this.transactions[index] = updated;

    this.auditService.record({
      actorId: mockClientId,
      actorType: "CLIENT",
      eventType: "TRANSACTION_CATEGORY_CHANGED",
      entityType: "TRANSACTION",
      entityId: transactionId,
      metadata: {
        previousCategory,
        newCategory: category
      }
    });

    return updated;
  }

  getSpendingSummary() {
    const cashflow = calculateMonthlyCashflow(this.transactions);
    const categories = summarizeSpendingByCategory(this.transactions);

    return {
      cashflow,
      topCategories: categories.slice(0, 5),
      budgets: mockBudgets
    };
  }

  getSpendingCategories() {
    return summarizeSpendingByCategory(this.transactions);
  }

  getRecurringPayments() {
    return mockRecurringPayments;
  }
}
