import type { BasisPoints } from "../shared/types.js";

export const FULL_ALLOCATION_BASIS_POINTS = 10_000;

export type AllocationInput = {
  targetWeightBasisPoints: BasisPoints;
};

export const sumAllocationBasisPoints = (allocations: readonly AllocationInput[]): BasisPoints => {
  return allocations.reduce((total, allocation) => total + allocation.targetWeightBasisPoints, 0);
};

export const validateFullAllocation = (allocations: readonly AllocationInput[]): void => {
  const total = sumAllocationBasisPoints(allocations);

  if (total !== FULL_ALLOCATION_BASIS_POINTS) {
    throw new Error(
      `Portfolio allocation must equal ${FULL_ALLOCATION_BASIS_POINTS} basis points, received ${total}.`
    );
  }
};
