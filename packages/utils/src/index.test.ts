import { describe, expect, it } from "vitest";
import { assertNever } from "./index.js";

describe("assertNever", () => {
  it("throws for impossible values at runtime", () => {
    expect(() => assertNever("unexpected" as never)).toThrow("Unexpected value: unexpected");
  });
});
