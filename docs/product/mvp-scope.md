# MVP Scope

## Product Goal

Build the first usable version of Luma Bank: a calm, trustworthy banking and investment web app where a retail client can view money, inspect transactions, search ISIN instruments, build a portfolio draft, and see risk-aware guidance before any simulated order flow.

## Primary User Outcomes

1. A client can understand their current cash position.
2. A client can inspect and categorize transactions.
3. A client can search investment instruments by ISIN or name.
4. A client can review risk, return, fee, and document information for an instrument.
5. A client can create a draft portfolio and see allocation, concentration, and risk indicators.
6. A client can preview an investment order with warnings before confirmation.
7. Admin and compliance actions are auditable from the beginning.

## MVP Modules

- Identity foundation.
- Authentication foundation.
- Banking dashboard.
- Transaction categorization.
- Instrument catalogue.
- Investment profile.
- Portfolio builder.
- Order preview.
- Audit logging.
- Admin foundations.

## Out Of Scope For First MVP

- Real payment initiation.
- Real brokerage execution.
- Real card issuing.
- Real KYC provider integration.
- Native mobile app.
- Personalized investment advice unless explicitly modeled and approved later.
- Production-grade fraud scoring.

## Compliance Baseline

The MVP must model the right control points even when integrations are mocked:

- Strong customer authentication hooks for sensitive actions.
- Suitability and appropriateness check records.
- Immutable-style audit events for sensitive actions.
- Explicit distinction between information, recommendation, advice, and execution.
- Data minimization and role-aware access boundaries.
