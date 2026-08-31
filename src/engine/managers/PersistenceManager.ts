const STORAGE_PREFIX = "pdl-portfolio-os";

export class LocalPersistenceManager implements PersistenceManager {
  private themeId: string;
  private namespace: string;

  constructor(themeId: string = "default") {
    this.themeId = themeId;
    this.namespace = `${STORAGE_PREFIX}-${themeId}`;
  }

  init(themeId: string): void {
    this.themeId = themeId;
    this.namespace = `${STORAGE_PREFIX}-${themeId}`;
  }

  private getKey(key: string): string {
    return `${this.namespace}:${key}`;
  }

  hasSeenTour(): boolean {
    return this.getPreference("__tour_seen") === true;
  }

  markTourSeen(): void {
    this.setPreference("__tour_seen", true);
  }

  getTourStep(): number {
    return (this.getPreference("__tour_step") as number) ?? 0;
  }

  setTourStep(step: number): void {
    this.setPreference("__tour_step", step);
  }

  getPreference(key: string): unknown {
    try {
      const raw = localStorage.getItem(this.getKey(key));
      if (raw === null) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  setPreference(key: string, value: unknown): void {
    try {
      localStorage.setItem(this.getKey(key), JSON.stringify(value));
    } catch {
      // localStorage might be full or disabled
    }
  }

  removePreference(key: string): void {
    localStorage.removeItem(this.getKey(key));
  }

  clearThemeData(): void {
    const keys = Object.keys(localStorage).filter((k) =>
      k.startsWith(this.namespace)
    );
    keys.forEach((k) => localStorage.removeItem(k));
  }

  destroy(): void {
    // No cleanup needed for localStorage
  }
}

interface PersistenceManager {
  init(themeId: string): void;
  hasSeenTour(): boolean;
  markTourSeen(): void;
  getTourStep(): number;
  setTourStep(step: number): void;
  getPreference(key: string): unknown;
  setPreference(key: string, value: unknown): void;
  removePreference(key: string): void;
  clearThemeData(): void;
  destroy(): void;
}
