import type { CurrencyCode } from "../shared/types.js";
import type { Instrument, InstrumentType } from "./instrument.js";

export type InstrumentSearchFilters = {
  query?: string;
  instrumentType?: InstrumentType;
  assetClass?: string;
  region?: string;
  sector?: string;
  currency?: CurrencyCode;
  retailOnly?: boolean;
  includeComplex?: boolean;
};

const normalize = (value: string): string => value.trim().toLowerCase();

const includesQuery = (instrument: Instrument, query: string): boolean => {
  const searchText = [
    instrument.isin,
    instrument.name,
    instrument.issuerName,
    instrument.assetClass,
    instrument.region,
    instrument.sector,
    instrument.currency,
    instrument.instrumentType
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return searchText.includes(normalize(query));
};

export const searchInstruments = (
  instruments: readonly Instrument[],
  filters: InstrumentSearchFilters = {}
): Instrument[] => {
  return instruments
    .filter((instrument) => {
      if (filters.query && !includesQuery(instrument, filters.query)) {
        return false;
      }

      if (filters.instrumentType && instrument.instrumentType !== filters.instrumentType) {
        return false;
      }

      if (
        filters.assetClass &&
        normalize(instrument.assetClass) !== normalize(filters.assetClass)
      ) {
        return false;
      }

      if (filters.region && normalize(instrument.region ?? "") !== normalize(filters.region)) {
        return false;
      }

      if (filters.sector && normalize(instrument.sector ?? "") !== normalize(filters.sector)) {
        return false;
      }

      if (filters.currency && instrument.currency !== filters.currency) {
        return false;
      }

      if (filters.retailOnly && !instrument.isAvailableForRetail) {
        return false;
      }

      if (filters.includeComplex === false && instrument.isComplex) {
        return false;
      }

      return true;
    })
    .sort((left, right) => left.name.localeCompare(right.name));
};

export const findInstrumentByIsin = (
  instruments: readonly Instrument[],
  isin: string
): Instrument | undefined => {
  return instruments.find((instrument) => normalize(instrument.isin) === normalize(isin));
};
