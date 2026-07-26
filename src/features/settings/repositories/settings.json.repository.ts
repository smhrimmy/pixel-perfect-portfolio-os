import { getJsonStore } from "@/database/registry";
import { defaultSettings, SETTINGS_ID, type SettingsProps } from "../domain/settings.entity";
import type { ISettingsRepository } from "./settings.repository";

const COLLECTION = "settings";

export class SettingsJsonRepository implements ISettingsRepository {
  private store = getJsonStore();
  async get(): Promise<SettingsProps> {
    const rows = await this.store.readAll<SettingsProps>(COLLECTION);
    const existing = rows.find((r) => r.id === SETTINGS_ID);
    if (existing) return existing;
    const seed = defaultSettings();
    await this.store.writeAll<SettingsProps>(COLLECTION, [seed]);
    return seed;
  }
  async save(props: SettingsProps): Promise<SettingsProps> {
    await this.store.writeAll<SettingsProps>(COLLECTION, [props]);
    return props;
  }
}
