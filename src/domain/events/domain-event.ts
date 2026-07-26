export interface DomainEvent<TPayload = unknown> {
  readonly name: string;
  readonly occurredAt: string;
  readonly aggregateId: string;
  readonly payload: TPayload;
}

export function makeEvent<T>(name: string, aggregateId: string, payload: T): DomainEvent<T> {
  return { name, occurredAt: new Date().toISOString(), aggregateId, payload };
}
