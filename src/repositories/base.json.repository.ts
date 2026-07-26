/**
 * Generic JSON repository. All feature repos extend this.
 * Implements Repository Pattern; storage is the JsonStore driver.
 */
import { NotFoundError } from "@/domain/shared/errors";
import { nowIso } from "@/domain/shared/value-objects";
import { getJsonStore } from "@/database/registry";
import type { JsonStore } from "@/database/json-store";

export interface Timestamped {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Repository<T extends Timestamped> {
  list(): Promise<T[]>;
  find(id: string): Promise<T | null>;
  get(id: string): Promise<T>;
  create(data: Omit<T, "createdAt" | "updatedAt">): Promise<T>;
  update(id: string, patch: Partial<Omit<T, "id" | "createdAt">>): Promise<T>;
  delete(id: string): Promise<void>;
}

export abstract class JsonRepository<T extends Timestamped> implements Repository<T> {
  protected readonly store: JsonStore;
  constructor(
    protected readonly collection: string,
    store?: JsonStore,
    private readonly seed: T[] = [],
  ) {
    this.store = store ?? getJsonStore();
  }

  protected async ensureSeeded(): Promise<void> {
    if (this.seed.length === 0) return;
    await this.store.seedIfEmpty<T>(this.collection, this.seed);
  }

  async list(): Promise<T[]> {
    await this.ensureSeeded();
    return this.store.readAll<T>(this.collection);
  }

  async find(id: string): Promise<T | null> {
    const rows = await this.list();
    return rows.find((r) => r.id === id) ?? null;
  }

  async get(id: string): Promise<T> {
    const row = await this.find(id);
    if (!row) throw new NotFoundError(this.collection, id);
    return row;
  }

  async create(data: Omit<T, "createdAt" | "updatedAt">): Promise<T> {
    const rows = await this.list();
    const now = nowIso();
    const row = { ...data, createdAt: now, updatedAt: now } as T;
    await this.store.writeAll<T>(this.collection, [...rows, row]);
    return row;
  }

  async update(id: string, patch: Partial<Omit<T, "id" | "createdAt">>): Promise<T> {
    const rows = await this.list();
    const idx = rows.findIndex((r) => r.id === id);
    if (idx === -1) throw new NotFoundError(this.collection, id);
    const next = { ...rows[idx], ...patch, id, updatedAt: nowIso() } as T;
    rows[idx] = next;
    await this.store.writeAll<T>(this.collection, rows);
    return next;
  }

  async delete(id: string): Promise<void> {
    const rows = await this.list();
    const next = rows.filter((r) => r.id !== id);
    if (next.length === rows.length) throw new NotFoundError(this.collection, id);
    await this.store.writeAll<T>(this.collection, next);
  }
}
