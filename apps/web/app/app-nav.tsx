"use client";

import Link from "next/link";

type AppNavProps = {
  active: "banking" | "investments" | "portfolio";
};

const navItems = [
  {
    id: "banking",
    href: "/",
    label: "Banking Dashboard"
  },
  {
    id: "investments",
    href: "/investments",
    label: "Investment Catalogue"
  },
  {
    id: "portfolio",
    href: "/portfolio-builder",
    label: "Portfolio Builder"
  }
] as const;

export function AppNav({ active }: AppNavProps) {
  return (
    <header className="top-navigation">
      <Link className="brand-lockup" href="/" aria-label="Luma Bank home">
        <span className="brand-mark">LB</span>
        <span>Luma Bank</span>
      </Link>

      <nav className="top-tabs" aria-label="Primary navigation">
        {navItems.map((item) => (
          <Link
            className={`top-tab ${active === item.id ? "active" : ""}`}
            href={item.href}
            key={item.id}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
