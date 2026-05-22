# Phase 3: Investment Catalogue

## Objective

Let clients explore ISIN-based investment instruments in a transparent, risk-aware way before any portfolio construction or order flow.

The catalogue should make risk, fees, product complexity, retail eligibility, and documents visible from the beginning. This phase remains mock-driven, but the API and domain shapes should be close to the future market data and product governance integrations.

## Delivery Approach

Build a vertical slice:

1. Instrument search and filtering helpers in `@luma-bank/domain`.
2. Mock instrument dataset with at least 10 instruments.
3. REST endpoints in the NestJS API for list, ISIN lookup, details, metrics, price history, and documents.
4. A Next.js investment catalogue page with search, filters, selected instrument details, fees, documents, and risk indicators.

## In Scope

- ISIN search by ISIN, name, issuer, asset class, region, sector, and currency.
- Instrument detail view.
- Risk, return, volatility, drawdown, and fee display.
- Complex product and retail eligibility indicators.
- Product document links.
- Mock price history.
- Watchlist-style UI affordance.

## Out Of Scope

- Real market data provider integration.
- Real product governance workflow.
- Real document storage.
- Admin instrument editing UI.
- Investment orders.
- Portfolio construction.
- Personalized advice.

## API Surface

```txt
GET /api/instruments
GET /api/instruments/:instrumentId
GET /api/instruments/isin/:isin
GET /api/instruments/:instrumentId/metrics
GET /api/instruments/:instrumentId/price-history
GET /api/instruments/:instrumentId/documents
```

## Acceptance Criteria

- `/investments` shows a usable instrument catalogue.
- Search works against ISIN, name, issuer, asset class, region, sector, and currency.
- At least 10 mock instruments are available.
- Instrument detail shows risk, return, fees, eligibility, and documents.
- Complex products are visibly flagged.
- API returns deterministic data for catalogue, detail, metrics, history, and documents.
- Domain tests cover search and filtering behavior.
- `corepack pnpm lint`, `corepack pnpm typecheck`, `corepack pnpm test`, and `corepack pnpm build` pass.

## Risks And Controls

| Risk                                       | Control                                                              |
| ------------------------------------------ | -------------------------------------------------------------------- |
| Product pages encourage reckless investing | Keep risk, drawdown, fees, and complexity visible near the top.      |
| Search logic drifts across API and UI      | Put deterministic search helpers in the domain package.              |
| Complex instruments look like simple ETFs  | Add `isComplex` and retail eligibility badges in the UI.             |
| Mock data is too thin for UI validation    | Include mixed asset classes, regions, risk levels, and fee profiles. |

## Definition Of Done

Phase 3 is complete when a client can open the investments catalogue, search for an ISIN or product, inspect risk and cost information, and see document links without entering an order flow.
