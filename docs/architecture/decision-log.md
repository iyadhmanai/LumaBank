# Decision Log

## ADR-0001: Start With A Modular Monolith

Status: Accepted

Context:

Luma Bank spans banking, investments, compliance, and admin workflows. The product needs strong boundaries, but early service fragmentation would slow delivery and increase operational overhead.

Decision:

Use a TypeScript modular monolith for the MVP, with clearly separated modules and shared domain packages.

Consequences:

- Faster early delivery.
- Easier local development.
- Lower deployment complexity.
- Requires discipline around module boundaries.
- Future extraction remains possible when scale or ownership requires it.

## ADR-0002: Use Next.js For The First Client And Admin Web Surface

Status: Accepted

Context:

The MVP needs a client-facing app and eventually an admin portal. A web-first approach lets us validate flows before investing in native mobile.

Decision:

Use Next.js for the first web app. Admin may be a separate app in the same monorepo or a protected route group, decided during scaffolding.

Consequences:

- Faster UI iteration.
- Shared UI package can emerge naturally.
- React Native can be added later without forcing early mobile architecture decisions.

## ADR-0003: Use NestJS For The API Service

Status: Accepted

Context:

The backend needs strong module boundaries, dependency injection, guards, middleware, and a structure suitable for compliance-sensitive workflows.

Decision:

Use NestJS for the API service.

Consequences:

- Clear module organization.
- Good fit for guards, interceptors, and providers.
- Slightly more framework structure than lighter alternatives.

## ADR-0004: Make Audit Logging A Foundation Feature

Status: Accepted

Context:

Banking and investment workflows require traceability for security, compliance, support, and incident response.

Decision:

Implement audit logging from the foundation phase, even while business integrations are mocked.

Consequences:

- More upfront modeling.
- Lower risk of retrofitting audit behavior later.
- Sensitive events can be tested from the start.
