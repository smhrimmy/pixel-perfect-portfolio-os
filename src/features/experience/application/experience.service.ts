import { DI, DI_TOKENS } from "@/providers/di.provider";
import { withUnitOfWork } from "@/application/unit-of-work";
import { Experience } from "../domain/experience.entity";
import { ExperienceMapper } from "../mappers/experience.mapper";
import { ExperienceJsonRepository } from "../repositories/experience.json.repository";
import type { IExperienceRepository } from "../repositories/experience.repository";
import type {
  ExperienceCreateInput,
  ExperienceUpdateInput,
} from "../schemas/experience.schema";
import type { ExperienceDto } from "../dto/experience.dto";

DI.register<IExperienceRepository>(DI_TOKENS.ExperienceRepo, () => new ExperienceJsonRepository());

export class ExperienceCommandService {
  constructor(private readonly repo: IExperienceRepository) {}
  create(input: ExperienceCreateInput): Promise<ExperienceDto> {
    return withUnitOfWork(async () => {
      const e = Experience.create(input);
      return ExperienceMapper.toDto(await this.repo.create(ExperienceMapper.toPersistence(e)));
    });
  }
  update(input: ExperienceUpdateInput): Promise<ExperienceDto> {
    return withUnitOfWork(async () => {
      const { id, ...patch } = input;
      return ExperienceMapper.toDto(await this.repo.update(id, patch));
    });
  }
  async delete(id: string): Promise<{ id: string }> {
    await this.repo.delete(id);
    return { id };
  }
}

export class ExperienceQueryService {
  constructor(private readonly repo: IExperienceRepository) {}
  async list(): Promise<ExperienceDto[]> {
    return (await this.repo.listOrdered()).map(ExperienceMapper.toDto);
  }
  async get(id: string): Promise<ExperienceDto> {
    return ExperienceMapper.toDto(await this.repo.get(id));
  }
}

DI.register(DI_TOKENS.ExperienceService, () => {
  const repo = DI.resolve<IExperienceRepository>(DI_TOKENS.ExperienceRepo);
  return { commands: new ExperienceCommandService(repo), queries: new ExperienceQueryService(repo) };
});

export interface ExperienceService {
  commands: ExperienceCommandService;
  queries: ExperienceQueryService;
}
export const experienceService = () =>
  DI.resolve<ExperienceService>(DI_TOKENS.ExperienceService);
