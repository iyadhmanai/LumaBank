import { describe, expect, it } from "vitest";
import { createAuditLog } from "./create-audit-log.js";

describe("createAuditLog", () => {
  it("creates an audit log with generated id and timestamp", () => {
    expect(
      createAuditLog(
        {
          actorId: "client-1",
          actorType: "CLIENT",
          eventType: "ORDER_PREVIEWED",
          entityType: "ORDER",
          entityId: "order-1"
        },
        {
          createId: () => "audit-1",
          now: () => "2026-05-22T12:00:00.000Z"
        }
      )
    ).toEqual({
      id: "audit-1",
      actorId: "client-1",
      actorType: "CLIENT",
      eventType: "ORDER_PREVIEWED",
      entityType: "ORDER",
      entityId: "order-1",
      createdAt: "2026-05-22T12:00:00.000Z"
    });
  });
});
