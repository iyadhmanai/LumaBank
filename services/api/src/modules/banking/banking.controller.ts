import { Body, Controller, Get, Inject, Param, Patch } from "@nestjs/common";
import type { TransactionCategory } from "@luma-bank/domain";
import { BankingService } from "./banking.service.js";

type UpdateCategoryBody = {
  category: TransactionCategory;
};

@Controller()
export class BankingController {
  constructor(@Inject(BankingService) private readonly bankingService: BankingService) {}

  @Get("accounts")
  listAccounts() {
    return this.bankingService.listAccounts();
  }

  @Get("accounts/:accountId")
  getAccount(@Param("accountId") accountId: string) {
    return this.bankingService.getAccount(accountId);
  }

  @Get("accounts/:accountId/balance")
  getBalance(@Param("accountId") accountId: string) {
    return this.bankingService.getBalance(accountId);
  }

  @Get("accounts/:accountId/transactions")
  listTransactions(@Param("accountId") accountId: string) {
    return this.bankingService.listTransactions(accountId);
  }

  @Get("transactions/:transactionId")
  getTransaction(@Param("transactionId") transactionId: string) {
    return this.bankingService.getTransaction(transactionId);
  }

  @Patch("transactions/:transactionId/category")
  updateTransactionCategory(
    @Param("transactionId") transactionId: string,
    @Body() body: UpdateCategoryBody
  ) {
    return this.bankingService.updateTransactionCategory(transactionId, body.category);
  }

  @Get("spending/summary")
  getSpendingSummary() {
    return this.bankingService.getSpendingSummary();
  }

  @Get("spending/categories")
  getSpendingCategories() {
    return this.bankingService.getSpendingCategories();
  }

  @Get("spending/recurring")
  getRecurringPayments() {
    return this.bankingService.getRecurringPayments();
  }
}
