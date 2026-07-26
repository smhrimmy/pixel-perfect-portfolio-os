import { Settings, type SettingsProps } from "../domain/settings.entity";
import type { SettingsDto } from "../dto/settings.dto";

export const SettingsMapper = {
  toDto(row: SettingsProps | Settings): SettingsDto {
    return row instanceof Settings ? row.snapshot() : { ...row };
  },
  toPersistence(entity: Settings): SettingsProps {
    return entity.snapshot();
  },
};
