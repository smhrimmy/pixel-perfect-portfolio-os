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
  constructor(private readonly dir: string) {}
  private async fs() {
    const fs = await import("node:fs/promises");
    const path = await import("node:path");
    return { fs, path };
  }
  private async filePath(collection: string): Promise<string> {
    const { fs, path } = await this.fs();
    await fs.mkdir(this.dir, { recursive: true });
    return path.join(this.dir, `${collection}.json`);
  }
  async readAll<T>(collection: string): Promise<T[]> {
    try {
      const { fs } = await this.fs();
      const p = await this.filePath(collection);
      const raw = await fs.readFile(p, "utf8");
      return JSON.parse(raw) as T[];
    } catch (e: unknown) {
      const err = e as NodeJS.ErrnoException;
      if (err?.code === "ENOENT") return [];
      throw new StorageError(`readAll(${collection}) failed`, e);
    }
  }
  async writeAll<T>(collection: string, rows: T[]): Promise<void> {
    try {
      const { fs } = await this.fs();
      const p = await this.filePath(collection);
      await fs.writeFile(p, JSON.stringify(rows, null, 2), "utf8");
    } catch (e) {
      throw new StorageError(`writeAll(${collection}) failed`, e);
    }
  }
  async seedIfEmpty<T>(collection: string, rows: T[]): Promise<void> {
    const existing = await this.readAll<T>(collection);
    if (existing.length === 0) {
      try {
        await this.writeAll(collection, rows);
      } catch (e) {
        console.warn(`[FsJsonStore] Skipping seed for ${collection} (read-only filesystem?)`, e);
      }
    }
  }
}
