import { Injectable, NotFoundException } from "@nestjs/common";
import {
  findInstrumentByIsin,
  searchInstruments,
  type InstrumentSearchFilters
} from "@luma-bank/domain/investments";
import { createMockPriceHistory, mockInstruments } from "./instruments.mock-data.js";

@Injectable()
export class InstrumentsService {
  list(filters: InstrumentSearchFilters) {
    return searchInstruments(mockInstruments, filters);
  }

  getById(instrumentId: string) {
    const instrument = mockInstruments.find((item) => item.id === instrumentId);

    if (!instrument) {
      throw new NotFoundException(`Instrument ${instrumentId} was not found.`);
    }

    return instrument;
  }

  getByIsin(isin: string) {
    const instrument = findInstrumentByIsin(mockInstruments, isin);

    if (!instrument) {
      throw new NotFoundException(`Instrument with ISIN ${isin} was not found.`);
    }

    return instrument;
  }

  getMetrics(instrumentId: string) {
    const instrument = this.getById(instrumentId);

    return {
      instrumentId: instrument.id,
      riskScore: instrument.riskScore,
      sriScore: instrument.sriScore,
      expectedReturnAnnual: instrument.expectedReturnAnnual,
      volatilityAnnual: instrument.volatilityAnnual,
      maxDrawdown: instrument.maxDrawdown,
      ongoingCharges: instrument.ongoingCharges,
      entryFee: instrument.entryFee,
      exitFee: instrument.exitFee,
      isComplex: instrument.isComplex,
      isAvailableForRetail: instrument.isAvailableForRetail
    };
  }

  getPriceHistory(instrumentId: string) {
    this.getById(instrumentId);
    return createMockPriceHistory(instrumentId);
  }

  getDocuments(instrumentId: string) {
    const instrument = this.getById(instrumentId);

    return [
      { type: "KID", url: instrument.kidDocumentUrl },
      { type: "FACTSHEET", url: instrument.factsheetUrl },
      { type: "PROSPECTUS", url: instrument.prospectusUrl }
    ].filter((document): document is { type: string; url: string } => Boolean(document.url));
  }
}
