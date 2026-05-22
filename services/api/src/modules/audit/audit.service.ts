import { Injectable, Logger } from "@nestjs/common";
import { createAuditLog, type AuditLog, type CreateAuditLogInput } from "@luma-bank/domain";

@Injectable()
export class AuditService {
  private readonly logger = new Logger(AuditService.name);
  private readonly events: AuditLog[] = [];

  record(input: CreateAuditLogInput): AuditLog {
    const event = createAuditLog(input);
    this.events.push(event);

    this.logger.log({
      message: "Audit event recorded",
      eventType: event.eventType,
      entityType: event.entityType,
      entityId: event.entityId
    });

    return event;
  }

  listRecent(limit = 50): AuditLog[] {
    return this.events.slice(-limit);
  }
}
