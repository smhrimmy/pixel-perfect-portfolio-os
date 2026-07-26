import { portfolioOsConfig } from "@/config/portfolio-os.config";
import { FsJsonStore, MemoryJsonStore, type JsonStore } from "./json-store";

let _store: JsonStore | null = null;

export function getJsonStore(): JsonStore {
  if (_store) return _store;
  _store =
    portfolioOsConfig.storage === "fs"
      ? new FsJsonStore(portfolioOsConfig.dataDir)
      : new MemoryJsonStore();
  return _store;
}

/** Test/override hook. */
export function __setJsonStore(store: JsonStore): void {
  _store = store;
}
