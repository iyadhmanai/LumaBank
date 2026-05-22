import { Controller, Get, Inject, Param, Query } from "@nestjs/common";
import type { InstrumentSearchFilters, InstrumentType } from "@luma-bank/domain/investments";
import { InstrumentsService } from "./instruments.service.js";

@Controller("instruments")
export class InstrumentsController {
  constructor(
    @Inject(InstrumentsService) private readonly instrumentsService: InstrumentsService
  ) {}

  @Get()
  list(
    @Query("q") query?: string,
    @Query("type") instrumentType?: InstrumentType,
    @Query("assetClass") assetClass?: string,
    @Query("region") region?: string,
    @Query("sector") sector?: string,
    @Query("currency") currency?: string,
    @Query("retailOnly") retailOnly?: string,
    @Query("includeComplex") includeComplex?: string
  ) {
    const filters: InstrumentSearchFilters = {};

    if (query) filters.query = query;
    if (instrumentType) filters.instrumentType = instrumentType;
    if (assetClass) filters.assetClass = assetClass;
    if (region) filters.region = region;
    if (sector) filters.sector = sector;
    if (currency) filters.currency = currency;
    if (retailOnly !== undefined) filters.retailOnly = retailOnly === "true";
    if (includeComplex !== undefined) filters.includeComplex = includeComplex === "true";

    return this.instrumentsService.list(filters);
  }

  @Get("isin/:isin")
  getByIsin(@Param("isin") isin: string) {
    return this.instrumentsService.getByIsin(isin);
  }

  @Get(":instrumentId")
  getById(@Param("instrumentId") instrumentId: string) {
    return this.instrumentsService.getById(instrumentId);
  }

  @Get(":instrumentId/metrics")
  getMetrics(@Param("instrumentId") instrumentId: string) {
    return this.instrumentsService.getMetrics(instrumentId);
  }

  @Get(":instrumentId/price-history")
  getPriceHistory(@Param("instrumentId") instrumentId: string) {
    return this.instrumentsService.getPriceHistory(instrumentId);
  }

  @Get(":instrumentId/documents")
  getDocuments(@Param("instrumentId") instrumentId: string) {
    return this.instrumentsService.getDocuments(instrumentId);
  }
}
