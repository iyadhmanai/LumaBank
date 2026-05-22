"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { BankAccount, Transaction } from "@luma-bank/domain/banking";
import type { Money } from "@luma-bank/domain/money";
import { productName } from "@luma-bank/domain/shared";
import { StatusBadge } from "@luma-bank/ui";
import {
  accounts,
  budgets,
  formatMoney,
  monthlyCashflow,
  recurringPayments,
  spendingByCategory,
  totalAvailableBalance,
  transactions
} from "./lib/banking-dashboard-data";

type TransactionFilter = "ALL" | "INCOMING" | "OUTGOING" | "PENDING";

const accountLabels = {
  CURRENT: "Everyday",
  SAVINGS: "Vault",
  INVESTMENT_CASH: "Invest"
} as const;

const accountDescriptions = {
  CURRENT: "Salary, cards, daily spending",
  SAVINGS: "Emergency fund and goals",
  INVESTMENT_CASH: "Ready for portfolio orders"
} as const;

const categoryAccents = ["#0f766e", "#275f87", "#a16107", "#7c3f58", "#5f6f52"];

const formatDate = (value: string): string => {
  return new Intl.DateTimeFormat("en-DE", {
    day: "2-digit",
    month: "short"
  }).format(new Date(value));
};

const categoryLabel = (value: string): string => {
  return value
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
};

const getDisplayName = (transaction: Transaction): string => {
  return transaction.merchantName ?? transaction.counterpartyName ?? "Unknown counterparty";
};

const getAccountBalance = (account: BankAccount): Money => account.availableBalance;

export function BankingDashboard() {
  const [activeAccountId, setActiveAccountId] = useState(accounts[0]?.id ?? "");
  const [transactionFilter, setTransactionFilter] = useState<TransactionFilter>("ALL");
  const [query, setQuery] = useState("");

  const activeAccount = accounts.find((account) => account.id === activeAccountId) ?? accounts[0];
  const accountTransactions = useMemo(() => {
    return transactions
      .filter((transaction) => transaction.accountId === activeAccount?.id)
      .filter((transaction) => {
        if (transactionFilter === "ALL") {
          return true;
        }

        if (transactionFilter === "PENDING") {
          return transaction.status === "PENDING";
        }

        return transaction.direction === transactionFilter;
      })
      .filter((transaction) => {
        const normalized = query.trim().toLowerCase();

        if (!normalized) {
          return true;
        }

        return [
          getDisplayName(transaction),
          transaction.category ?? "OTHER",
          transaction.remittanceInformation ?? ""
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalized);
      })
      .sort((left, right) => right.bookingDate.localeCompare(left.bookingDate));
  }, [activeAccount?.id, query, transactionFilter]);

  const expenseRatio = Math.min(
    100,
    Math.round((monthlyCashflow.expenses.amountMinor / monthlyCashflow.income.amountMinor) * 100)
  );
  const selectedAccountShare = activeAccount
    ? Math.round(
        (activeAccount.availableBalance.amountMinor / totalAvailableBalance.amountMinor) * 100
      )
    : 0;

  return (
    <main className="app-shell">
      <nav className="rail" aria-label="Primary">
        <div className="brand-mark">LB</div>
        <Link className="rail-button active" href="/" aria-label="Dashboard">
          D
        </Link>
        <button className="rail-button" aria-label="Cards">
          C
        </button>
        <Link className="rail-button" href="/investments" aria-label="Investments">
          I
        </Link>
        <button className="rail-button" aria-label="Settings">
          S
        </button>
      </nav>

      <section className="workspace">
        <header className="app-header">
          <div>
            <p className="eyebrow">{productName}</p>
            <h1>Good evening, Iyadh</h1>
          </div>
          <div className="header-actions">
            <StatusBadge label="Secure session" tone="success" />
            <button className="ghost-button" type="button">
              Export
            </button>
          </div>
        </header>

        <section className="hero-grid" aria-label="Banking overview">
          <article className="balance-hero">
            <div className="balance-topline">
              <div>
                <span className="section-label">Total available</span>
                <strong>{formatMoney(totalAvailableBalance)}</strong>
              </div>
              <span className="live-chip">Live</span>
            </div>

            <div className="balance-visual" aria-hidden="true">
              <span style={{ height: "42%" }} />
              <span style={{ height: "68%" }} />
              <span style={{ height: "54%" }} />
              <span style={{ height: "82%" }} />
              <span style={{ height: "61%" }} />
              <span style={{ height: "76%" }} />
              <span style={{ height: "88%" }} />
            </div>

            <div className="quick-actions" aria-label="Quick actions">
              <button type="button">Send</button>
              <button type="button">Top up</button>
              <button type="button">Move</button>
              <button type="button">Invest</button>
            </div>
          </article>

          <article className="cash-card">
            <div
              className="cash-ring"
              style={{ "--ring-value": `${expenseRatio}%` } as CSSProperties}
            >
              <span>{expenseRatio}%</span>
            </div>
            <div>
              <span className="section-label">Monthly flow</span>
              <h2>{formatMoney(monthlyCashflow.net)} net</h2>
              <p>
                {formatMoney(monthlyCashflow.income)} in, {formatMoney(monthlyCashflow.expenses)}{" "}
                out.
              </p>
            </div>
          </article>
        </section>

        <section className="account-carousel" aria-label="Accounts">
          {accounts.map((account) => {
            const isActive = account.id === activeAccount?.id;

            return (
              <button
                className={`account-tile ${isActive ? "active" : ""}`}
                key={account.id}
                onClick={() => setActiveAccountId(account.id)}
                type="button"
              >
                <span>{accountLabels[account.accountType]}</span>
                <strong>{formatMoney(getAccountBalance(account))}</strong>
                <small>{accountDescriptions[account.accountType]}</small>
              </button>
            );
          })}
        </section>

        <section className="content-grid">
          <article className="panel transaction-panel">
            <div className="panel-heading">
              <div>
                <span className="section-label">Selected account</span>
                <h2>{activeAccount ? accountLabels[activeAccount.accountType] : "Account"}</h2>
              </div>
              <span>{selectedAccountShare}% of total cash</span>
            </div>

            <div className="account-detail-strip">
              <div>
                <span>IBAN</span>
                <strong>{activeAccount?.iban}</strong>
              </div>
              <div>
                <span>Status</span>
                <strong>{activeAccount?.status}</strong>
              </div>
              <div>
                <span>Booked</span>
                <strong>{activeAccount ? formatMoney(activeAccount.bookedBalance) : "-"}</strong>
              </div>
            </div>

            <div className="transaction-toolbar">
              <div className="segmented-control" aria-label="Transaction filter">
                {(["ALL", "OUTGOING", "INCOMING", "PENDING"] as const).map((filter) => (
                  <button
                    className={transactionFilter === filter ? "active" : ""}
                    key={filter}
                    onClick={() => setTransactionFilter(filter)}
                    type="button"
                  >
                    {filter.toLowerCase()}
                  </button>
                ))}
              </div>
              <input
                aria-label="Search transactions"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search activity"
                value={query}
              />
            </div>

            <div className="transaction-list modern">
              {accountTransactions.map((transaction) => {
                const sign = transaction.direction === "INCOMING" ? "+" : "-";

                return (
                  <button
                    className="transaction-row interactive"
                    key={transaction.id}
                    type="button"
                  >
                    <span className="merchant-avatar">
                      {getDisplayName(transaction).slice(0, 1)}
                    </span>
                    <span>
                      <strong>{getDisplayName(transaction)}</strong>
                      <small>
                        {formatDate(transaction.bookingDate)} ·{" "}
                        {categoryLabel(transaction.category ?? "OTHER")}
                      </small>
                    </span>
                    <span className="transaction-amount">
                      <strong className={transaction.direction === "INCOMING" ? "positive" : ""}>
                        {sign}
                        {formatMoney(transaction.amount)}
                      </strong>
                      <small>{transaction.status}</small>
                    </span>
                  </button>
                );
              })}
            </div>
          </article>

          <aside className="insight-stack">
            <article className="panel">
              <div className="panel-heading">
                <div>
                  <span className="section-label">Spending intelligence</span>
                  <h2>Category pulse</h2>
                </div>
              </div>
              <div className="category-list">
                {spendingByCategory.slice(0, 5).map((item, index) => {
                  const width = Math.max(
                    8,
                    Math.round(
                      (item.amount.amountMinor / monthlyCashflow.expenses.amountMinor) * 100
                    )
                  );

                  return (
                    <div className="category-row" key={item.category}>
                      <div>
                        <span>
                          <i style={{ background: categoryAccents[index] }} />
                          {categoryLabel(item.category)}
                        </span>
                        <strong>{formatMoney(item.amount)}</strong>
                      </div>
                      <div className="meter" aria-hidden="true">
                        <span style={{ width: `${width}%`, background: categoryAccents[index] }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </article>

            <article className="panel action-panel">
              <div>
                <span className="section-label">Cash guard</span>
                <h2>Budgets on track</h2>
              </div>
              <div className="compact-list">
                {budgets.map((budget) => {
                  const progress = Math.round(
                    (budget.spent.amountMinor / budget.limit.amountMinor) * 100
                  );

                  return (
                    <div className="budget-row" key={budget.id}>
                      <div>
                        <span>{budget.label}</span>
                        <strong>{progress}%</strong>
                      </div>
                      <div className="meter" aria-hidden="true">
                        <span style={{ width: `${progress}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </article>

            <article className="panel">
              <div className="panel-heading">
                <div>
                  <span className="section-label">Upcoming</span>
                  <h2>Recurring payments</h2>
                </div>
              </div>
              <div className="compact-list">
                {recurringPayments.map((payment) => (
                  <div className="compact-row" key={payment.id}>
                    <span>{payment.name}</span>
                    <strong>{formatMoney(payment.amount)}</strong>
                    <small>{payment.nextExpectedDate}</small>
                  </div>
                ))}
              </div>
            </article>
          </aside>
        </section>
      </section>
    </main>
  );
}
