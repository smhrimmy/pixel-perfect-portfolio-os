import type { DomainEvent } from "./domain-event";

export type EventHandler<T = unknown> = (event: DomainEvent<T>) => void | Promise<void>;

export interface EventBus {
  subscribe<T>(name: string, handler: EventHandler<T>): () => void;
  publish(event: DomainEvent): Promise<void>;
  publishAll(events: DomainEvent[]): Promise<void>;
}

class InMemoryEventBus implements EventBus {
  private handlers = new Map<string, Set<EventHandler>>();
  subscribe<T>(name: string, handler: EventHandler<T>): () => void {
    const set = this.handlers.get(name) ?? new Set();
    set.add(handler as EventHandler);
    this.handlers.set(name, set);
    return () => set.delete(handler as EventHandler);
  }
  async publish(event: DomainEvent): Promise<void> {
    const set = this.handlers.get(event.name);
    if (!set) return;
    await Promise.all([...set].map((h) => Promise.resolve(h(event))));
  }
  async publishAll(events: DomainEvent[]): Promise<void> {
    for (const e of events) await this.publish(e);
  }
}

export const eventBus: EventBus = new InMemoryEventBus();
