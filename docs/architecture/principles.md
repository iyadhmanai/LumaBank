# Architecture Principles

## Architecture Style

Start with a modular monolith. Keep domain boundaries explicit so modules can become services later only when there is a real operational reason.

## Bounded Contexts

- Auth and security.
- Clients and onboarding.
- Accounts and transactions.
- Categorization and spending analytics.
- Instruments.
- Investment profiles.
- Portfolios.
- Orders.
- Model portfolios.
- Risk.
- Compliance and audit.
- Notifications.
- Admin.

## Dependency Direction

Domain logic should not depend on frameworks, databases, or UI code.

Preferred flow:

1. Domain types and business rules.
2. Application services and use cases.
3. Infrastructure adapters.
4. API controllers and UI clients.

## Data And Money

- Store money as integer minor units where practical.
- Keep currency explicit.
- Use deterministic calculations for financial and risk logic.
- Avoid floating point for persisted monetary values.
- Make status transitions explicit and testable.

## Compliance By Design

- Sensitive actions emit audit events.
- Order and suitability decisions keep durable records.
- Admin access is role-scoped and auditable.
- External providers must be behind adapters.
- Regulatory warnings must be represented in domain models, not only UI text.

## Testing Strategy

- Unit tests for deterministic domain rules.
- Integration tests for API boundaries.
- End-to-end tests for critical user journeys.
- Security and permission tests for sensitive actions.
