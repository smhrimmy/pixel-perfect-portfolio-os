/**
 * Portfolio OS runtime configuration.
 * Central place for tuning storage driver, data dir, and feature flags.
 */
export type StorageDriverKind = "fs" | "memory";

export interface PortfolioOsConfig {
  storage: StorageDriverKind;
  dataDir: string;
  autoSeed: boolean;
}

function detectDefaultDriver(): StorageDriverKind {
  // Workers have no writable FS. `process` exists via nodejs_compat but
  // fs writes will still fail. Prefer explicit env override.
  const override = (globalThis as { process?: { env?: Record<string, string | undefined> } })
    .process?.env?.PORTFOLIO_OS_STORAGE as StorageDriverKind | undefined;
  return override || "fs";
}

export const portfolioOsConfig: PortfolioOsConfig = {
  storage: detectDefaultDriver(),
  dataDir: "data/portfolio-os",
  autoSeed: true,
};
