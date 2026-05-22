import { productName } from "@luma-bank/domain";
import { StatusBadge } from "@luma-bank/ui";

const foundationItems = [
  "Modular monolith",
  "Next.js client",
  "NestJS API",
  "Shared domain package",
  "Audit-first architecture"
];

export default function HomePage() {
  return (
    <main className="page">
      <section className="intro">
        <div>
          <p className="eyebrow">Phase 0 foundation</p>
          <h1>{productName}</h1>
          <p className="summary">
            A euro-based digital banking and investment platform built with clear domain boundaries,
            regulatory awareness, and a scalable TypeScript monorepo.
          </p>
        </div>
        <StatusBadge label="Foundation ready" tone="success" />
      </section>

      <section className="grid" aria-label="Foundation modules">
        {foundationItems.map((item) => (
          <article className="tile" key={item}>
            <span>{item}</span>
          </article>
        ))}
      </section>
    </main>
  );
}
