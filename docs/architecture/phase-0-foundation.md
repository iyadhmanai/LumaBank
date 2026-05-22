# Phase 0 Foundation

Phase 0 creates the engineering base for Luma Bank.

## Created Structure

```txt
apps/web              Next.js client app
services/api          NestJS API service
packages/domain       Shared domain language and pure rules
packages/ui           Shared React UI primitives
packages/config       Shared configuration defaults
packages/utils        Shared utilities
packages/api-client   Shared API client helpers
infra/docker          Local PostgreSQL and Redis
```

## Local Commands

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

Run tests:

```bash
corepack pnpm test
```

Run type checks:

```bash
corepack pnpm typecheck
```

Clear generated build caches:

```bash
corepack pnpm clean
```

Start local infrastructure:

```bash
docker compose -f infra/docker/docker-compose.yml up -d
```

## Notes

- Phase 0 intentionally keeps business logic small.
- The domain package already has money and audit primitives so Phase 1 can expand from a clean base.
- PostgreSQL and Redis are defined but not required for the first compile.

## Acceptance Evidence

Phase 0 is considered complete when these commands pass from the repository root:

```bash
corepack pnpm install
corepack pnpm lint
corepack pnpm typecheck
corepack pnpm test
corepack pnpm build
```

The scaffold also exposes:

```txt
Web app:    http://localhost:3000
API health: http://localhost:4000/api/health
```

Expected API health response:

```json
{ "status": "ok", "service": "Luma Bank API" }
```

## Known Foundation Notes

- Root scripts intentionally use `corepack pnpm` so they work even when `pnpm` is not directly available on the shell path.
- Build output directories are ignored by Git and excluded from linting.
- The API currently has a health module and audit module only. Business modules start in Phase 1 and Phase 2.
- The local database and Redis services are defined but not yet integrated into the API.

## Troubleshooting

If the web app fails with an error like `Cannot find module './257.js'`, stop the web dev
server and clear the generated Next.js cache:

```bash
corepack pnpm --filter @luma-bank/web clean
corepack pnpm dev
```

This can happen after changing workspace package exports or Next.js bundler settings while an
old dev server is still running.
