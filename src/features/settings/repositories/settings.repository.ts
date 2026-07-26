import type { SettingsProps } from "../domain/settings.entity";

export interface ISettingsRepository {
  get(): Promise<SettingsProps>;
  save(props: SettingsProps): Promise<SettingsProps>;
}
