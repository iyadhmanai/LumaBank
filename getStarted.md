# Get Started With Luma Bank

This guide assumes you are starting from a MacBook Air with no developer tools installed.

By the end, you should have:

- Homebrew installed.
- Git installed.
- Node.js installed.
- pnpm installed.
- The Luma Bank project ready for development.
- A clear checklist for Phase 1: Core Domain and Audit.

## 1. Open Terminal

Open the macOS Terminal app:

```txt
Applications -> Utilities -> Terminal
```

You will run all commands in Terminal.

## 2. Install Apple Command Line Tools

These tools are required for Git, compilers, and many developer packages.

```bash
xcode-select --install
```

After running the command, macOS will open an installer popup. Accept it and wait until installation finishes.

Verify:

```bash
xcode-select -p
```

You should see a path similar to:

```txt
/Library/Developer/CommandLineTools
```

## 3. Install Homebrew

Homebrew is the package manager we will use to install developer tools on macOS.

Run:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

When the installation finishes, Homebrew may print commands to add it to your shell profile.

On Apple Silicon MacBook Air, run:

```bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

On older Intel MacBook Air, run:

```bash
echo 'eval "$(/usr/local/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/usr/local/bin/brew shellenv)"
```

Verify:

```bash
brew --version
```

## 4. Install Git

Git is used for version control.

```bash
brew install git
```

Verify:

```bash
git --version
```

Configure your Git identity:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

Check:

```bash
git config --global --list
```

## 5. Install Node.js With nvm

Node.js runs JavaScript and TypeScript tooling.

We will use `nvm`, which lets you install and switch Node.js versions safely.

Install `nvm`:

```bash
brew install nvm
```

Create the nvm directory:

```bash
mkdir ~/.nvm
```

Add nvm to your shell profile:

```bash
cat <<'EOF' >> ~/.zprofile

export NVM_DIR="$HOME/.nvm"
[ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && \. "/opt/homebrew/opt/nvm/nvm.sh"
[ -s "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm" ] && \. "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm"
EOF
```

If you are on an Intel Mac and Homebrew is installed under `/usr/local`, use this instead:

```bash
cat <<'EOF' >> ~/.zprofile

export NVM_DIR="$HOME/.nvm"
[ -s "/usr/local/opt/nvm/nvm.sh" ] && \. "/usr/local/opt/nvm/nvm.sh"
[ -s "/usr/local/opt/nvm/etc/bash_completion.d/nvm" ] && \. "/usr/local/opt/nvm/etc/bash_completion.d/nvm"
EOF
```

Reload your shell:

```bash
source ~/.zprofile
```

Verify nvm:

```bash
nvm --version
```

Install Node.js 22:

```bash
nvm install 22
nvm use 22
nvm alias default 22
```

Verify:

```bash
node --version
npm --version
```

## 6. Install pnpm

`pnpm` is the package manager we will use for this monorepo.

Install pnpm using Corepack, which comes with modern Node.js.

Use pnpm 10 for this project. It is stable and avoids surprises from future `latest` releases:

```bash
corepack enable
corepack prepare pnpm@10 --activate
```

Verify:

```bash
pnpm --version
```

## 7. Install A Code Editor

Recommended editor: Visual Studio Code.

Install with Homebrew:

```bash
brew install --cask visual-studio-code
```

Open the project folder:

```bash
code /Users/iyadh.manai/git/LumaBank
```

If the `code` command does not work yet, open VS Code manually, press:

```txt
Command + Shift + P
```

Then search for:

```txt
Shell Command: Install 'code' command in PATH
```

## 8. Go To The Project Directory

Run:

```bash
cd /Users/iyadh.manai/git/LumaBank
```

Confirm you are in the right folder:

```bash
pwd
```

Expected:

```txt
/Users/iyadh.manai/git/LumaBank
```

## 9. Initialize Git For The Project

If Git is not already initialized:

```bash
git init
```

Check status:

```bash
git status
```

Create the first commit after the initial files are ready:

```bash
git add .
git commit -m "docs: add project foundation documents"
```

## 10. Install Optional Local Services

Later phases will use PostgreSQL and Redis.

Install Docker Desktop:

```bash
brew install --cask docker
```

Then open Docker Desktop once from Applications and finish its setup.

Verify:

```bash
docker --version
docker compose version
```

You do not need PostgreSQL or Redis running for the first documentation-only step, but they will be needed once we scaffold the backend.

## 11. Recommended Project Stack

For Luma Bank, we will use:

```txt
Package manager: pnpm
Language: TypeScript
Frontend: Next.js
Backend: NestJS
Database: PostgreSQL
Cache and queues: Redis
Testing: Vitest
Linting: ESLint
Formatting: Prettier
Validation: Zod
Architecture: Modular monolith
```

## 12. Target Repository Structure

The project should evolve toward:

```txt
LumaBank/
  apps/
    web/
  services/
    api/
  packages/
    domain/
    ui/
    config/
    utils/
    api-client/
  infra/
    docker/
  docs/
    architecture/
    delivery/
    product/
  tests/
```

## 13. Phase 1 Goal

Phase 1 is called:

```txt
Core Domain And Audit
```

The goal is to define the business language and compliance foundations before building screens and workflows.

We will implement:

- Core domain models.
- Money types.
- Status enums.
- Status transition rules.
- Audit event types.
- Basic audit service shape.
- Tests for critical deterministic logic.

## 14. Phase 1 Step-By-Step Plan

### Step 1: Create The Monorepo Foundation

Create:

```txt
package.json
pnpm-workspace.yaml
tsconfig.base.json
```

Add workspaces for:

```txt
apps/*
services/*
packages/*
```

Expected result:

```bash
pnpm install
```

works from the project root.

### Step 2: Create The Domain Package

Create:

```txt
packages/domain/
  package.json
  tsconfig.json
  src/
    index.ts
```

This package will hold shared business models and pure business rules.

### Step 3: Add Shared Primitives

Create:

```txt
packages/domain/src/shared/
```

Add types for:

```txt
EntityId
IsoDateString
IsoDateTimeString
CurrencyCode
```

These types keep the domain consistent.

### Step 4: Add Money Types

Create:

```txt
packages/domain/src/money/
```

Add:

```txt
Money
CurrencyCode
createMoney
addMoney
subtractMoney
```

Important rule:

```txt
Store money as integer minor units.
```

Example:

```txt
1234 means 12.34 EUR
```

### Step 5: Add Client Models

Create:

```txt
packages/domain/src/clients/
```

Implement:

```txt
Client
ClientStatus
TaxResidency
Consent
RiskFlag
```

Important statuses:

```txt
PENDING_KYC
ACTIVE
SUSPENDED
CLOSED
```

### Step 6: Add Banking Models

Create:

```txt
packages/domain/src/banking/
```

Implement:

```txt
BankAccount
AccountStatus
AccountType
Transaction
TransactionStatus
TransactionDirection
TransactionCategory
```

Important rule:

```txt
Transaction amounts should use Money.
```

### Step 7: Add Investment Models

Create:

```txt
packages/domain/src/investments/
```

Implement:

```txt
Instrument
InstrumentType
InvestmentProfile
RiskLevel
KnowledgeLevel
InvestmentObjective
SuitabilityResult
```

Important compliance rule:

```txt
Complex instruments and retail eligibility must be represented in the domain model.
```

### Step 8: Add Portfolio Models

Create:

```txt
packages/domain/src/portfolios/
```

Implement:

```txt
Portfolio
PortfolioStatus
PortfolioType
PortfolioHolding
PortfolioMetric
PortfolioRiskWarning
ModelPortfolio
ModelPortfolioVersion
ModelPortfolioAllocation
```

Important rule:

```txt
Model portfolios must be versioned.
```

### Step 9: Add Order Models

Create:

```txt
packages/domain/src/orders/
```

Implement:

```txt
InvestmentOrder
OrderStatus
OrderSide
OrderPreview
FeeBreakdown
ClientWarning
Settlement
```

Important statuses:

```txt
DRAFT
PENDING_CLIENT_CONFIRMATION
PENDING_SCA
SUBMITTED
ACCEPTED
PARTIALLY_EXECUTED
EXECUTED
REJECTED
CANCELLED
SETTLED
FAILED
```

### Step 10: Add Status Transition Rules

Create transition helpers for workflows where random status changes would be dangerous.

Start with:

```txt
Order status transitions
Client status transitions
Portfolio status transitions
```

Example order flow:

```txt
DRAFT
-> PENDING_CLIENT_CONFIRMATION
-> PENDING_SCA
-> SUBMITTED
-> ACCEPTED
-> EXECUTED
-> SETTLED
```

Also allow failure or cancellation where legally and operationally valid.

### Step 11: Add Audit Models

Create:

```txt
packages/domain/src/audit/
```

Implement:

```txt
AuditLog
AuditEventType
AuditActorType
AuditEntityType
```

Initial audit event types:

```txt
LOGIN_SUCCEEDED
LOGIN_FAILED
DEVICE_REGISTERED
CLIENT_PROFILE_VIEWED
ADMIN_DATA_ACCESSED
TRANSACTION_CATEGORY_CHANGED
INSTRUMENT_UPDATED
PORTFOLIO_UPDATED
ORDER_PREVIEWED
ORDER_CONFIRMED
SUITABILITY_WARNING_SHOWN
CLIENT_ACCEPTED_WARNING
```

Each audit log should include:

```txt
id
actorId
actorType
eventType
entityType
entityId
metadata
ipAddress
userAgent
createdAt
```

### Step 12: Add Tests

Use Vitest.

Add tests for:

```txt
Money helper functions
Order status transitions
Client status transitions
Portfolio status transitions
Audit log creation
Portfolio allocation validation
```

Minimum commands:

```bash
pnpm test
pnpm typecheck
```

Both should pass before moving to Phase 2.

### Step 13: Create The API Audit Module Shape

In the NestJS API service, create:

```txt
services/api/src/modules/audit/
  audit.module.ts
  audit.service.ts
```

At first, the audit service can write to memory or structured logs.

Later, it will write to PostgreSQL.

### Step 14: Phase 1 Acceptance Checklist

Phase 1 is complete when:

- The monorepo installs with `pnpm install`.
- The domain package compiles.
- Domain models are exported from `packages/domain/src/index.ts`.
- Money uses integer minor units.
- Order, client, and portfolio transitions are tested.
- Audit event types exist.
- Audit log creation is tested.
- `pnpm test` passes.
- `pnpm typecheck` passes.

## 15. Daily Development Commands

Go to the project:

```bash
cd /Users/iyadh.manai/git/LumaBank
```

Install dependencies:

```bash
pnpm install
```

Run tests:

```bash
pnpm test
```

Run type checking:

```bash
pnpm typecheck
```

Run linting:

```bash
pnpm lint
```

Check Git status:

```bash
git status
```

Save work:

```bash
git add .
git commit -m "your commit message"
```

## 16. Recommended Commit Style

Use clear commit messages:

```txt
docs: add get started guide
chore: scaffold monorepo
feat(domain): add banking models
feat(domain): add audit events
test(domain): add order transition tests
```

## 17. What We Will Implement First

The first implementation task should be:

```txt
Scaffold the TypeScript monorepo and create the packages/domain package.
```

After that:

```txt
Add shared primitives, money types, and core domain models.
```

This keeps the foundation clean before adding UI or backend complexity.
