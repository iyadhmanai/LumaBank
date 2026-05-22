import { describe, expect, it } from "vitest";
import type { Instrument } from "./instrument.js";
import { findInstrumentByIsin, searchInstruments } from "./catalogue.js";

const instruments: Instrument[] = [
  {
    id: "instrument-msci-world",
    isin: "IE00B4L5Y983",
    name: "iShares Core MSCI World UCITS ETF",
    instrumentType: "ETF",
    currency: "EUR",
    issuerName: "BlackRock",
    assetClass: "Equity",
    region: "Global",
    sector: "Broad market",
    riskScore: 4,
    isComplex: false,
    isAvailableForRetail: true,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z"
  },
  {
    id: "instrument-structured",
    isin: "DE000LUMA001",
    name: "Luma Callable Yield Note",
    instrumentType: "STRUCTURED_PRODUCT",
    currency: "EUR",
    issuerName: "Luma Markets",
    assetClass: "Structured product",
    region: "Europe",
    riskScore: 5,
    isComplex: true,
    isAvailableForRetail: false,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z"
  }
];

describe("instrument catalogue helpers", () => {
  it("searches by ISIN, name, issuer, and region", () => {
    expect(searchInstruments(instruments, { query: "msci" })).toHaveLength(1);
    expect(searchInstruments(instruments, { query: "IE00B4L5Y983" })).toHaveLength(1);
    expect(searchInstruments(instruments, { query: "blackrock" })).toHaveLength(1);
    expect(searchInstruments(instruments, { query: "europe" })).toHaveLength(1);
  });

  it("can exclude complex products and non-retail products", () => {
    expect(searchInstruments(instruments, { includeComplex: false })).toEqual([instruments[0]]);
    expect(searchInstruments(instruments, { retailOnly: true })).toEqual([instruments[0]]);
  });

  it("finds instruments by ISIN case-insensitively", () => {
    expect(findInstrumentByIsin(instruments, "ie00b4l5y983")?.id).toBe("instrument-msci-world");
  });
});
