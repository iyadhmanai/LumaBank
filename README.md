# Luma Bank

Luma Bank is a euro-based digital banking and investment platform for retail clients.

The product combines:

- Retail banking dashboard and transaction analytics.
- ISIN-based investment catalogue.
- Portfolio building and comparison.
- Model portfolios.
- Suitability, audit, and security foundations for EU financial regulation.

This repository is currently in project foundation mode. The first objective is to create a scalable TypeScript monorepo with a modular monolith backend, shared domain packages, and a Next.js client experience.

## Current Direction

- MVP architecture: modular monolith.
- Frontend: Next.js web app first, mobile later.
- Backend: NestJS API service.
- Database: PostgreSQL.
- Shared packages: domain models, UI, config, API client, utilities.
- Compliance posture: PSD2/SCA, MiFID II suitability and appropriateness, GDPR, DORA-aware operations.

## Project Documents

- [MVP Scope](docs/product/mvp-scope.md)
- [Delivery Plan](docs/delivery/delivery-plan.md)
- [Phase 1 Core Domain And Audit](docs/delivery/phase-1-core-domain-and-audit.md)
- [Phase 2 Banking Dashboard Mock](docs/delivery/phase-2-banking-dashboard-mock.md)
- [Phase 3 Investment Catalogue](docs/delivery/phase-3-investment-catalogue.md)
- [Phase 4 Portfolio Builder](docs/delivery/phase-4-portfolio-builder.md)
- [Architecture Principles](docs/architecture/principles.md)
- [Phase 0 Foundation](docs/architecture/phase-0-foundation.md)
- [Decision Log](docs/architecture/decision-log.md)

## Development

Install dependencies:

```bash
corepack pnpm install
```

Run the web app:

```bash
corepack pnpm dev
```

Run the API:

```bash
corepack pnpm dev:api
```

Run checks:

```bash
corepack pnpm typecheck
corepack pnpm test
corepack pnpm lint
```
