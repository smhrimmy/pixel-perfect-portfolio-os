/**
 * Base Entity + AggregateRoot per DDD.
 * Aggregates collect DomainEvents that are dispatched by the UoW commit.
 */
import type { DomainEvent } from "@/domain/events/domain-event";

export abstract class Entity<TProps extends { id: string }> {
  protected readonly props: TProps;
  constructor(props: TProps) {
    this.props = props;
  }
  get id(): string {
    return this.props.id;
  }
  equals(other?: Entity<TProps>): boolean {
    return !!other && other.id === this.id;
  }
  snapshot(): TProps {
    return { ...this.props };
  }
}

export abstract class AggregateRoot<TProps extends { id: string }> extends Entity<TProps> {
  private _events: DomainEvent[] = [];
  protected record(event: DomainEvent): void {
    this._events.push(event);
  }
  pullEvents(): DomainEvent[] {
    const events = this._events;
    this._events = [];
    return events;
  }
}
