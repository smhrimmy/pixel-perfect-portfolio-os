/**
 * Lightweight Unit of Work — runs a scope, then dispatches any accumulated
 * domain events on the shared event bus. JSON writes are already durable per
 * op; UoW guarantees that events are only published after successful returns.
 */
import type { DomainEvent } from "@/domain/events/domain-event";
import { eventBus } from "@/domain/events/event-bus";

export interface UnitOfWorkContext {
  record(event: DomainEvent): void;
  events(): DomainEvent[];
}

class DefaultCtx implements UnitOfWorkContext {
  private _events: DomainEvent[] = [];
  record(event: DomainEvent): void {
    this._events.push(event);
  }
  events(): DomainEvent[] {
    return this._events;
  }
}

export async function withUnitOfWork<T>(work: (ctx: UnitOfWorkContext) => Promise<T>): Promise<T> {
  const ctx = new DefaultCtx();
  const result = await work(ctx);
  await eventBus.publishAll(ctx.events());
  return result;
}
