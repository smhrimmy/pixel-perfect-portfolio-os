import { ValidationError } from "./errors";

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export class Slug {
  private constructor(public readonly value: string) {}
  static create(input: string): Slug {
    const v = input.trim().toLowerCase();
    if (!SLUG_RE.test(v)) throw new ValidationError(`Invalid slug: ${input}`);
    if (v.length > 200) throw new ValidationError("Slug too long");
    return new Slug(v);
  }
  static fromTitle(title: string): Slug {
    const v = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 80);
    return Slug.create(v || `item-${Date.now()}`);
  }
  toString(): string {
    return this.value;
  }
}

export function newId(): string {
  const g = globalThis as { crypto?: { randomUUID?: () => string } };
  if (g.crypto?.randomUUID) return g.crypto.randomUUID();
  // RFC4122-ish fallback
  const rnd = () => Math.floor(Math.random() * 0xffffffff).toString(16).padStart(8, "0");
  return `${rnd()}-${rnd().slice(0, 4)}-4${rnd().slice(1, 4)}-a${rnd().slice(1, 4)}-${rnd()}${rnd().slice(0, 4)}`;
}

export function nowIso(): string {
  return new Date().toISOString();
}
