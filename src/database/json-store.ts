/**
 * JsonStore — pluggable key/collection driver backing all JSON repositories.
 *
 * Two drivers:
 *  - MemoryJsonStore: in-process Map; used on the edge Worker (no writable FS).
 *  - FsJsonStore:     node:fs backed, one JSON file per collection; used in Node.
 *
 * All repositories talk to this interface. Swap drivers via portfolioOsConfig.
 */
import { StorageError } from "@/domain/shared/errors";

export interface JsonStore {
  readAll<T>(collection: string): Promise<T[]>;
  writeAll<T>(collection: string, rows: T[]): Promise<void>;
  seedIfEmpty<T>(collection: string, rows: T[]): Promise<void>;
}

export class MemoryJsonStore implements JsonStore {
  private data = new Map<string, unknown[]>();
  async readAll<T>(collection: string): Promise<T[]> {
    return ([...(this.data.get(collection) ?? [])] as T[]);
  }
  async writeAll<T>(collection: string, rows: T[]): Promise<void> {
    this.data.set(collection, [...rows] as unknown[]);
  }
  async seedIfEmpty<T>(collection: string, rows: T[]): Promise<void> {
    if (!this.data.has(collection)) this.data.set(collection, [...rows] as unknown[]);
  }
}

export class FsJsonStore implements JsonStore {
  private static memoryFallback = new Map<string, unknown[]>();

  constructor(private readonly dir: string) {}

  private async fs() {
    try {
      const fs = await import("node:fs/promises");
      const path = await import("node:path");
      return { fs, path };
    } catch {
      return null;
    }
  }

  private async filePath(collection: string): Promise<string | null> {
    try {
      const mod = await this.fs();
      if (!mod) return null;
      const { fs, path } = mod;
      await fs.mkdir(this.dir, { recursive: true }).catch(() => {});
      return path.join(this.dir, `${collection}.json`);
    } catch {
      return null;
    }
  }

  async readAll<T>(collection: string): Promise<T[]> {
    // 1. Check in-memory cache first if updated at runtime
    if (FsJsonStore.memoryFallback.has(collection)) {
      return ([...(FsJsonStore.memoryFallback.get(collection) ?? [])] as T[]);
    }

    try {
      const mod = await this.fs();
      if (!mod) return [];
      const { fs, path } = mod;
      const p = path.join(this.dir, `${collection}.json`);
      const raw = await fs.readFile(p, "utf8");
      const data = JSON.parse(raw) as T[];
      FsJsonStore.memoryFallback.set(collection, [...data] as unknown[]);
      return data;
    } catch (e: unknown) {
      const err = e as NodeJS.ErrnoException;
      if (err?.code === "ENOENT") {
        return ([...(FsJsonStore.memoryFallback.get(collection) ?? [])] as T[]);
      }
      return ([...(FsJsonStore.memoryFallback.get(collection) ?? [])] as T[]);
    }
  }

  async writeAll<T>(collection: string, rows: T[]): Promise<void> {
    // Always store in memory cache so the app functions seamlessly in all environments
    FsJsonStore.memoryFallback.set(collection, [...rows] as unknown[]);

    try {
      const mod = await this.fs();
      if (!mod) return;
      const { fs, path } = mod;
      await fs.mkdir(this.dir, { recursive: true }).catch(() => {});
      const p = path.join(this.dir, `${collection}.json`);
      await fs.writeFile(p, JSON.stringify(rows, null, 2), "utf8");
    } catch (e) {
      // In serverless environments (Vercel, Cloudflare Workers, AWS Lambda),
      // the filesystem is read-only. We log a warning and proceed with the in-memory state.
      console.warn(`[FsJsonStore] Write to filesystem skipped for '${collection}' (read-only environment):`, (e as Error)?.message);
    }
  }

  async seedIfEmpty<T>(collection: string, rows: T[]): Promise<void> {
    const existing = await this.readAll<T>(collection);
    if (existing.length === 0) {
      await this.writeAll(collection, rows);
    }
  }
}
