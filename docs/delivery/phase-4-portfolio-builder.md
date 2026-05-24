# Phase 4: Portfolio Builder

## Objective

Let clients create and inspect a draft investment portfolio ISIN by ISIN before entering an order flow.

The builder should make allocation, concentration, expected return, volatility, and risk warnings visible while keeping a clear distinction between self-directed simulation and investment advice.

## Delivery Approach

Build a vertical slice:

1. Portfolio calculation helpers in `@luma-bank/domain`.
2. Mock portfolio data and REST endpoints in the NestJS API.
3. Interactive Next.js portfolio builder page.
4. Tests for allocation, weighted metrics, and concentration warnings.

## In Scope

- Draft portfolio view.
- Add/remove-style mock allocation controls in the UI.
- Target allocation table.
- Expected return placeholder based on weighted instrument returns.
- Volatility placeholder based on weighted instrument volatility.
- Risk score based on weighted instrument risk.
- Asset allocation and concentration warnings.
- Comparison placeholder against benchmark/model portfolio.

## Out Of Scope

- Real order execution.
- Real persistence.
- Personalized advice.
- Full covariance/correlation risk model.
- Tax simulation.
- Rebalancing engine.

## API Surface

```txt
GET /api/portfolios
POST /api/portfolios
GET /api/portfolios/:portfolioId
POST /api/portfolios/:portfolioId/holdings
PATCH /api/portfolios/:portfolioId/holdings/:holdingId
DELETE /api/portfolios/:portfolioId/holdings/:holdingId
GET /api/portfolios/:portfolioId/metrics
GET /api/portfolios/:portfolioId/risk
GET /api/portfolios/:portfolioId/comparison
POST /api/portfolios/:portfolioId/simulate
```

## Acceptance Criteria

- `/portfolio-builder` shows a usable portfolio builder.
- Users can adjust draft allocation values locally.
- Allocation total and remaining allocation are visible.
- Portfolio metrics update from selected allocations.
- Concentration warnings appear when one holding exceeds the threshold.
- API returns deterministic portfolio, metric, risk, and comparison mock data.
- Portfolio update endpoints emit audit events.
- Domain tests cover weighted metrics and concentration warnings.
- `corepack pnpm lint`, `corepack pnpm typecheck`, `corepack pnpm test`, and `corepack pnpm build` pass.

## Risks And Controls

| Risk                                      | Control                                                |
| ----------------------------------------- | ------------------------------------------------------ |
| UI implies investment advice              | Use simulation language and clear warnings.            |
| Risk metric appears overly precise        | Label calculations as placeholder estimates.           |
| Concentrated portfolios look acceptable   | Add explicit concentration warnings.                   |
| Allocation math drifts between API and UI | Keep deterministic calculations in the domain package. |
| Portfolio edits lose auditability later   | Emit audit events from mock update endpoints now.      |

## Definition Of Done

Phase 4 is complete when a client can open the portfolio builder, adjust allocations, see estimated risk and return, and receive warnings before any order preview is introduced.
