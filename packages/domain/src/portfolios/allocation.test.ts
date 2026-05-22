import { describe, expect, it } from "vitest";
import {
  FULL_ALLOCATION_BASIS_POINTS,
  sumAllocationBasisPoints,
  validateFullAllocation
} from "./allocation.js";

describe("portfolio allocation validation", () => {
  it("sums allocation basis points", () => {
    expect(
      sumAllocationBasisPoints([
        { targetWeightBasisPoints: 5000 },
        { targetWeightBasisPoints: 3000 },
        { targetWeightBasisPoints: 2000 }
      ])
    ).toBe(FULL_ALLOCATION_BASIS_POINTS);
  });

  it("accepts a full allocation", () => {
    expect(() =>
      validateFullAllocation([{ targetWeightBasisPoints: 6000 }, { targetWeightBasisPoints: 4000 }])
    ).not.toThrow();
  });

  it("rejects incomplete allocations", () => {
    expect(() =>
      validateFullAllocation([{ targetWeightBasisPoints: 6000 }, { targetWeightBasisPoints: 3000 }])
    ).toThrow("Portfolio allocation must equal 10000 basis points");
  });
});
