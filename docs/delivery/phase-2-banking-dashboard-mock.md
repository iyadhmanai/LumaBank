# Phase 2: Banking Dashboard Mock

## Objective

Give a retail client a first usable view of their money: accounts, balances, transactions, category spending, monthly cash flow, recurring payments, and a budget prototype.

This phase is intentionally mock-driven. The purpose is to validate product shape, API boundaries, and domain calculations before integrating a real core banking provider.

## Delivery Approach

Build a vertical slice:

1. Banking analytics helpers in `@luma-bank/domain`.
2. Mock banking data and REST endpoints in the NestJS API.
3. Dashboard UI in the Next.js web app.
4. Audit event emission for transaction category changes.
5. Tests for deterministic spending and cash-flow calculations.

## In Scope

- Account overview.
- Balance cards.
- Recent transaction list.
- Transaction detail endpoint.
- Transaction category update endpoint.
- Spending by category.
- Monthly income versus expense.
- Recurring payment mock.
- Budget prototype.
- API routes aligned with the MVP draft.

## Out Of Scope

- Real bank account aggregation.
- Real payments.
- Real statements.
- Persistent database storage.
- User-specific authentication.
- Production categorization engine.

## API Surface

```txt
GET /api/accounts
GET /api/accounts/:accountId
GET /api/accounts/:accountId/balance
GET /api/accounts/:accountId/transactions
GET /api/transactions/:transactionId
PATCH /api/transactions/:transactionId/category
GET /api/spending/summary
GET /api/spending/categories
GET /api/spending/recurring
```

## Acceptance Criteria

- The web home page shows the banking dashboard as the first screen.
- The API returns deterministic account, transaction, spending, and recurring payment data.
- Category updates emit an audit event.
- Spending summaries use booked outgoing transactions only.
- Monthly cash-flow calculations separate income and expense.
- Domain tests cover spending by category and monthly cash flow.
- `corepack pnpm lint`, `corepack pnpm typecheck`, `corepack pnpm test`, and `corepack pnpm build` pass.

## Risks And Controls

| Risk                                                       | Control                                                         |
| ---------------------------------------------------------- | --------------------------------------------------------------- |
| Mock UI drifts from future API contracts                   | Keep API endpoints and UI data shapes close to MVP route draft. |
| Spending analytics accidentally count pending transactions | Domain helpers filter to `BOOKED` transactions.                 |
| Income and expenses are mixed together                     | Domain helpers use transaction direction explicitly.            |
| Category updates happen without traceability               | API calls the audit service on category changes.                |
| Dashboard becomes decorative instead of operational        | Use compact, scan-friendly banking layout.                      |

## Definition Of Done

Phase 2 is complete when a user can open the app, understand their cash position, inspect recent transactions, see spending by category, and the API exposes the banking mock routes needed for later UI integration.
