"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { StatusBadge } from "@luma-bank/ui";
import { AppNav } from "../app-nav";
import {
  builderInstruments,
  calculateBuilderState,
  formatBasisPoints,
  formatPercent,
  initialAllocations
} from "./lib/portfolio-builder-data";

const getInstrument = (instrumentId: string) =>
  builderInstruments.find((instrument) => instrument.id === instrumentId);

export function PortfolioBuilderClient() {
  const [allocations, setAllocations] = useState(initialAllocations);
  const builderState = useMemo(() => calculateBuilderState(allocations), [allocations]);

  const updateAllocation = (instrumentId: string, nextWeight: number) => {
    setAllocations((current) =>
      current.map((allocation) =>
        allocation.instrumentId === instrumentId
          ? { ...allocation, targetWeightBasisPoints: nextWeight * 100 }
          : allocation
      )
    );
  };

  return (
    <main className="app-shell">
      <AppNav active="portfolio" />
      <section className="workspace">
        <header className="app-header">
          <div>
            <p className="eyebrow">Portfolio builder</p>
            <h1>Shape a draft before you invest</h1>
          </div>
          <div className="header-actions">
            <StatusBadge label="Simulation" tone="warning" />
            <Link className="ghost-button link-button" href="/investments">
              Catalogue
            </Link>
          </div>
        </header>

        <section className="builder-hero">
          <article className="balance-hero portfolio-summary">
            <div className="balance-topline">
              <div>
                <span className="section-label">Allocation total</span>
                <strong>{formatBasisPoints(builderState.totalBasisPoints)}</strong>
              </div>
              <span
                className={builderState.remainingBasisPoints === 0 ? "live-chip" : "warning-chip"}
              >
                {builderState.remainingBasisPoints === 0
                  ? "Balanced"
                  : `${formatBasisPoints(Math.abs(builderState.remainingBasisPoints))} ${
                      builderState.remainingBasisPoints > 0 ? "remaining" : "over"
                    }`}
              </span>
            </div>
            <div className="portfolio-metric-strip">
              <div>
                <span>Expected return</span>
                <strong>{formatPercent(builderState.metric.expectedAnnualReturn)}</strong>
              </div>
              <div>
                <span>Volatility</span>
                <strong>{formatPercent(builderState.metric.annualizedVolatility)}</strong>
              </div>
              <div>
                <span>Risk</span>
                <strong>{builderState.metric.riskLevel ?? "-"}/5</strong>
              </div>
            </div>
          </article>

          <article className="panel comparison-card">
            <span className="section-label">Comparison</span>
            <h2>Draft vs MSCI World</h2>
            <div className="comparison-row">
              <span>Expected return</span>
              <strong>{formatPercent(builderState.metric.expectedAnnualReturn)} vs 6.4%</strong>
            </div>
            <div className="comparison-row">
              <span>Volatility</span>
              <strong>{formatPercent(builderState.metric.annualizedVolatility)} vs 14.2%</strong>
            </div>
            <p>
              This is a simulation only. It is not personalized advice or an order recommendation.
            </p>
          </article>
        </section>

        <section className="builder-grid">
          <article className="panel allocation-panel">
            <div className="panel-heading">
              <div>
                <span className="section-label">Draft holdings</span>
                <h2>Target allocation</h2>
              </div>
            </div>

            <div className="allocation-list">
              {allocations.map((allocation) => {
                const instrument = getInstrument(allocation.instrumentId);
                const percent = allocation.targetWeightBasisPoints / 100;

                return (
                  <div className="allocation-row" key={allocation.instrumentId}>
                    <div>
                      <strong>{instrument?.name ?? allocation.instrumentId}</strong>
                      <small>
                        {instrument?.isin} · {instrument?.assetClass} · Risk {instrument?.riskScore}
                        /5
                      </small>
                    </div>
                    <input
                      aria-label={`Allocation for ${instrument?.name ?? allocation.instrumentId}`}
                      max="70"
                      min="0"
                      onChange={(event) =>
                        updateAllocation(allocation.instrumentId, Number(event.target.value))
                      }
                      step="5"
                      type="range"
                      value={percent}
                    />
                    <span>{percent}%</span>
                  </div>
                );
              })}
            </div>
          </article>

          <aside className="insight-stack">
            <article className="panel">
              <div className="panel-heading">
                <div>
                  <span className="section-label">Exposure</span>
                  <h2>Asset allocation</h2>
                </div>
              </div>
              <div className="category-list">
                {builderState.allocationByAssetClass.map((item) => (
                  <div className="category-row" key={item.label}>
                    <div>
                      <span>{item.label}</span>
                      <strong>{formatBasisPoints(item.targetWeightBasisPoints)}</strong>
                    </div>
                    <div className="meter" aria-hidden="true">
                      <span style={{ width: `${item.targetWeightBasisPoints / 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="panel disclosure-panel">
              <div>
                <span className="section-label">Risk warnings</span>
                <h2>Pre-trade checks</h2>
              </div>
              {builderState.warnings.length > 0 ? (
                <div className="warning-list">
                  {builderState.warnings.map((warning) => (
                    <div className="warning-item" key={warning.id}>
                      <strong>{warning.severity}</strong>
                      <span>{warning.message}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No concentration warning with the current allocation.</p>
              )}
            </article>
          </aside>
        </section>
      </section>
    </main>
  );
}
