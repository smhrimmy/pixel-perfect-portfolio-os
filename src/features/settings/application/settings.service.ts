import { DI, DI_TOKENS } from "@/providers/di.provider";
import { withUnitOfWork } from "@/application/unit-of-work";
import { Settings } from "../domain/settings.entity";
import { SettingsMapper } from "../mappers/settings.mapper";
import { SettingsJsonRepository } from "../repositories/settings.json.repository";
import type { ISettingsRepository } from "../repositories/settings.repository";
import type { SettingsUpdateInput } from "../schemas/settings.schema";
import type { SettingsDto } from "../dto/settings.dto";

DI.register<ISettingsRepository>(DI_TOKENS.SettingsRepo, () => new SettingsJsonRepository());

export class SettingsCommandService {
  constructor(private readonly repo: ISettingsRepository) {}
  update(patch: SettingsUpdateInput): Promise<SettingsDto> {
    return withUnitOfWork(async (uow) => {
      const current = await this.repo.get();
      const entity = Settings.fromProps(current);
      entity.applyPatch(patch);
      const saved = await this.repo.save(SettingsMapper.toPersistence(entity));
      for (const e of entity.pullEvents()) uow.record(e);
      return SettingsMapper.toDto(saved);
    });
  }
}
export class SettingsQueryService {
  constructor(private readonly repo: ISettingsRepository) {}
  async get(): Promise<SettingsDto> {
    return SettingsMapper.toDto(await this.repo.get());
  }
}

DI.register(DI_TOKENS.SettingsService, () => {
  const repo = DI.resolve<ISettingsRepository>(DI_TOKENS.SettingsRepo);
  return { commands: new SettingsCommandService(repo), queries: new SettingsQueryService(repo) };
});

export interface SettingsService {
  commands: SettingsCommandService;
  queries: SettingsQueryService;
}
export const settingsService = () => DI.resolve<SettingsService>(DI_TOKENS.SettingsService);
