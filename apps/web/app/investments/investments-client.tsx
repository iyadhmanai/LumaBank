"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  searchInstruments,
  type Instrument,
  type InstrumentSearchFilters
} from "@luma-bank/domain/investments";
import { StatusBadge } from "@luma-bank/ui";
import { AppNav } from "../app-nav";
import {
  createPriceHistory,
  defaultInstrument,
  formatPercent,
  instruments,
  readableType
} from "./lib/investment-catalogue-data";

const typeFilters = ["ALL", "ETF", "BOND", "MONEY_MARKET_FUND", "STRUCTURED_PRODUCT"] as const;

const riskTone = (riskScore: number): string => {
  if (riskScore <= 2) {
    return "Low";
  }

  if (riskScore === 3) {
    return "Medium";
  }

  return "High";
};

const documentLinks = (instrument: Instrument) => {
  return [
    { label: "KID", url: instrument.kidDocumentUrl },
    { label: "Factsheet", url: instrument.factsheetUrl },
    { label: "Prospectus", url: instrument.prospectusUrl }
  ].filter((document): document is { label: string; url: string } => Boolean(document.url));
};

export function InvestmentsClient() {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<(typeof typeFilters)[number]>("ALL");
  const [retailOnly, setRetailOnly] = useState(true);
  const [selectedId, setSelectedId] = useState(defaultInstrument?.id ?? instruments[0]?.id ?? "");

  const filteredInstruments = useMemo(() => {
    const filters: InstrumentSearchFilters = {
      query,
      retailOnly,
      includeComplex: !retailOnly
    };

    if (typeFilter !== "ALL") {
      filters.instrumentType = typeFilter;
    }

    return searchInstruments(instruments, filters);
  }, [query, retailOnly, typeFilter]);

  const selectedInstrument =
    instruments.find((instrument) => instrument.id === selectedId) ??
    filteredInstruments[0] ??
    instruments[0];
  const priceHistory = selectedInstrument ? createPriceHistory(selectedInstrument.id) : [];
  const minValue = Math.min(...priceHistory.map((point) => point.value));
  const maxValue = Math.max(...priceHistory.map((point) => point.value));

  return (
    <main className="app-shell">
      <AppNav active="investments" />
      <section className="workspace investments-workspace">
        <header className="app-header">
          <div>
            <p className="eyebrow">Investment catalogue</p>
            <h1>Explore ISINs with risk in sight</h1>
          </div>
          <div className="header-actions">
            <StatusBadge label="Information only" tone="warning" />
            <Link className="ghost-button link-button" href="/">
              Banking
            </Link>
            <Link className="ghost-button link-button" href="/portfolio-builder">
              Builder
            </Link>
          </div>
        </header>

        <section className="catalogue-layout">
          <article className="panel catalogue-panel">
            <div className="catalogue-toolbar">
              <input
                aria-label="Search instruments"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search ISIN, issuer, asset class, region"
                value={query}
              />
              <label className="toggle-row">
                <input
                  checked={retailOnly}
                  onChange={(event) => setRetailOnly(event.target.checked)}
                  type="checkbox"
                />
                Retail eligible
              </label>
            </div>

            <div className="filter-pills" aria-label="Instrument type filters">
              {typeFilters.map((filter) => (
                <button
                  className={typeFilter === filter ? "active" : ""}
                  key={filter}
                  onClick={() => setTypeFilter(filter)}
                  type="button"
                >
                  {filter === "ALL" ? "All" : readableType(filter)}
                </button>
              ))}
            </div>

            <div className="instrument-list">
              {filteredInstruments.map((instrument) => (
                <button
                  className={`instrument-row ${selectedInstrument?.id === instrument.id ? "active" : ""}`}
                  key={instrument.id}
                  onClick={() => setSelectedId(instrument.id)}
                  type="button"
                >
                  <span className="instrument-symbol">{instrument.assetClass.slice(0, 2)}</span>
                  <span>
                    <strong>{instrument.name}</strong>
                    <small>
                      {instrument.isin} · {instrument.issuerName}
                    </small>
                  </span>
                  <span className="instrument-meta">
                    <strong>{formatPercent(instrument.expectedReturnAnnual)}</strong>
                    <small>Risk {instrument.riskScore}/5</small>
                  </span>
                </button>
              ))}
            </div>
          </article>

          {selectedInstrument ? (
            <aside className="instrument-detail">
              <article className="instrument-hero panel">
                <div>
                  <span className="section-label">{selectedInstrument.isin}</span>
                  <h2>{selectedInstrument.name}</h2>
                  <p>
                    {selectedInstrument.issuerName} ·{" "}
                    {readableType(selectedInstrument.instrumentType)} · {selectedInstrument.region}
                  </p>
                </div>
                <div className="instrument-badges">
                  <span>{riskTone(selectedInstrument.riskScore)} risk</span>
                  <span>
                    {selectedInstrument.isAvailableForRetail ? "Retail eligible" : "Restricted"}
                  </span>
                  {selectedInstrument.isComplex ? <span>Complex</span> : null}
                </div>
              </article>

              <section className="metric-grid">
                <article className="metric-card">
                  <span>Expected return</span>
                  <strong>{formatPercent(selectedInstrument.expectedReturnAnnual)}</strong>
                </article>
                <article className="metric-card">
                  <span>Volatility</span>
                  <strong>{formatPercent(selectedInstrument.volatilityAnnual)}</strong>
                </article>
                <article className="metric-card">
                  <span>Max drawdown</span>
                  <strong>{formatPercent(selectedInstrument.maxDrawdown)}</strong>
                </article>
                <article className="metric-card">
                  <span>Ongoing fee</span>
                  <strong>{formatPercent(selectedInstrument.ongoingCharges)}</strong>
                </article>
              </section>

              <article className="panel performance-panel">
                <div className="panel-heading">
                  <div>
                    <span className="section-label">Performance</span>
                    <h2>Mock 12-month path</h2>
                  </div>
                </div>
                <div className="price-bars" aria-label="Mock price history">
                  {priceHistory.map((point) => {
                    const range = Math.max(1, maxValue - minValue);
                    const height = 28 + ((point.value - minValue) / range) * 72;

                    return (
                      <div key={point.label}>
                        <span style={{ height: `${height}%` }} />
                        <small>{point.label}</small>
                      </div>
                    );
                  })}
                </div>
              </article>

              <article className="panel disclosure-panel">
                <div>
                  <span className="section-label">Risk and fees</span>
                  <h2>Before investing</h2>
                </div>
                <p>
                  Historical and expected return figures are not guarantees. Fees, volatility,
                  product complexity, liquidity, and suitability must be reviewed before any order
                  flow.
                </p>
                <div className="document-list">
                  {documentLinks(selectedInstrument).map((document) => (
                    <a href={document.url} key={document.label}>
                      {document.label}
                    </a>
                  ))}
                </div>
              </article>
            </aside>
          ) : null}
        </section>
      </section>
    </main>
  );
}
