# Delivery Plan

## Working Method

We will build in thin vertical slices. Each slice should include domain model, API contract, persistence shape when needed, UI surface, tests for critical logic, and audit/security hooks where relevant.

## Phase 0: Project Foundation

Goal: Create a maintainable engineering base.

Deliverables:

- TypeScript monorepo.
- Next.js web app.
- NestJS API service.
- Shared domain package.
- Shared UI package.
- Shared config package.
- PostgreSQL and Redis local Docker Compose.
- ESLint, Prettier, Vitest.
- Basic CI-ready scripts.
- Architecture docs and decision log.

Acceptance criteria:

- `pnpm install` works.
- `pnpm lint`, `pnpm test`, and `pnpm typecheck` are defined.
- Web and API can start locally.
- Domain models compile under strict TypeScript settings.

## Phase 1: Core Domain And Audit

Goal: Define the language of the system before feature growth.

Deliverables:

- Client, account, transaction, instrument, portfolio, order, model portfolio, and audit log types.
- Domain enums and status transitions.
- Money handling conventions using integer minor units.
- Audit event model and API middleware/service.

Acceptance criteria:

- Domain package has tests for money helpers and status transitions.
- Audit events are emitted for sensitive mock actions.

## Phase 2: Banking Dashboard Mock

Goal: Let a client understand cash position.

Deliverables:

- Account overview page.
- Balance and recent transactions.
- Transaction detail.
- Category correction.
- Spending summary by category.
- Monthly income versus expense.

Acceptance criteria:

- Mock APIs provide deterministic banking data.
- Category edits create audit events.
- UI clearly separates cash balance from investment value.

## Phase 3: ISIN Catalogue

Goal: Let a client explore products responsibly.

Deliverables:

- Instrument search.
- Instrument detail.
- Risk, return, volatility, drawdown, and fee sections.
- Document links.
- Mock dataset of at least 10 instruments.
- Admin instrument management foundation.

Acceptance criteria:

- Search works by ISIN, name, issuer, asset class, and region.
- Complex and retail eligibility flags are visible.
- Instrument update actions are auditable.

## Phase 4: Portfolio Builder

Goal: Let a client construct and evaluate a draft portfolio.

Deliverables:

- Portfolio creation.
- Add/remove ISIN holdings.
- Target allocation table.
- Allocation breakdowns.
- Risk calculation placeholder.
- Expected return placeholder.
- Concentration warnings.
- Compare against index or model portfolio placeholder.

Acceptance criteria:

- Portfolio calculations are deterministic and tested.
- Portfolio updates create audit events.
- Unsuitable or concentrated allocations show clear warnings.

## Phase 5: Order Preview

Goal: Model the safe pre-trade path before real execution.

Deliverables:

- Buy/sell order preview.
- Fee preview.
- Suitability or appropriateness check.
- Risk warning capture.
- SCA hook.
- Mock order statuses.

Acceptance criteria:

- User sees fees and risk before confirmation.
- Order preview and warning acceptance are auditable.
- Order status transitions are explicit and tested.
