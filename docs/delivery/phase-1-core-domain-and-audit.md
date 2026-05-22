# Phase 1: Core Domain And Audit

## Objective

Define the core business language of Luma Bank before building banking and investment workflows.

This phase gives us typed, tested domain models for clients, banking, investments, portfolios, orders, and audit events. The goal is to prevent the application from becoming screen-driven or database-driven too early.

## Delivery Approach

Build the shared `@luma-bank/domain` package first, then connect the API audit module to the new audit model.

Implementation order:

1. Shared primitives and product metadata.
2. Money helpers using integer minor units.
3. Client and banking models.
4. Investment, portfolio, and order models.
5. Explicit status transition rules.
6. Audit event model and audit log creation helper.
7. API audit service foundation.
8. Tests for deterministic rules.

## In Scope

- `Client`, `ClientStatus`, `TaxResidency`, `Consent`, and `RiskFlag`.
- `BankAccount`, `Transaction`, categories, directions, and statuses.
- `Instrument`, `InvestmentProfile`, `SuitabilityResult`, and risk levels.
- `Portfolio`, `PortfolioHolding`, metrics, warnings, and model portfolio versioning.
- `InvestmentOrder`, `OrderPreview`, fees, client warnings, settlement, and statuses.
- Audit actor, event, entity types, and audit log creation.
- Status transition helpers for clients, portfolios, and orders.
- Allocation validation using basis points.

## Out Of Scope

- Database persistence.
- Real authentication.
- Real KYC, market data, brokerage, or core banking integration.
- Full suitability engine scoring.
- Admin UI.
- Order execution.

## Acceptance Criteria

- Domain code is split into bounded context folders.
- All public domain exports are available from `@luma-bank/domain`.
- Money helpers reject decimal minor units and currency mismatches.
- Order status transitions are explicit and tested.
- Client status transitions are explicit and tested.
- Portfolio status transitions are explicit and tested.
- Allocation validation catches totals that do not equal 100%.
- Audit log creation requires actor, event, entity, and timestamp information.
- API audit service records typed audit events.
- `corepack pnpm lint`, `corepack pnpm typecheck`, `corepack pnpm test`, and `corepack pnpm build` pass.

## Risks And Controls

| Risk                                     | Control                                                     |
| ---------------------------------------- | ----------------------------------------------------------- |
| Financial amounts handled as floats      | Use `Money.amountMinor` and integer validation.             |
| Workflows skip legally relevant states   | Add explicit transition helpers and tests.                  |
| Audit logging is retrofitted too late    | Keep audit models and API audit service in Phase 1.         |
| Model portfolios lose history            | Represent versions as first-class domain objects.           |
| Suitability gets treated as UI text only | Represent suitability results and warnings in domain types. |

## Definition Of Done

Phase 1 is done when the domain package can support Phase 2 banking dashboard mocks without adding core entity vocabulary under UI or controller folders.
