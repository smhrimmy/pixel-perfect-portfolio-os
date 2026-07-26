import { DI, DI_TOKENS } from "@/providers/di.provider";
import { withUnitOfWork } from "@/application/unit-of-work";
import { Skill } from "../domain/skill.entity";
import { SkillMapper } from "../mappers/skill.mapper";
import { SkillsJsonRepository } from "../repositories/skills.json.repository";
import type { ISkillsRepository } from "../repositories/skills.repository";
import type { SkillCreateInput, SkillUpdateInput } from "../schemas/skill.schema";
import type { SkillDto } from "../dto/skill.dto";

DI.register<ISkillsRepository>(DI_TOKENS.SkillsRepo, () => new SkillsJsonRepository());

export class SkillsCommandService {
  constructor(private readonly repo: ISkillsRepository) {}
  create(input: SkillCreateInput): Promise<SkillDto> {
    return withUnitOfWork(async () => {
      const entity = Skill.create(input);
      return SkillMapper.toDto(await this.repo.create(SkillMapper.toPersistence(entity)));
    });
  }
  update(input: SkillUpdateInput): Promise<SkillDto> {
    return withUnitOfWork(async () => {
      const { id, ...patch } = input;
      return SkillMapper.toDto(await this.repo.update(id, patch));
    });
  }
  async delete(id: string): Promise<{ id: string }> {
    await this.repo.delete(id);
    return { id };
  }
}

export class SkillsQueryService {
  constructor(private readonly repo: ISkillsRepository) {}
  async list(): Promise<SkillDto[]> {
    return (await this.repo.list()).map(SkillMapper.toDto);
  }
  async listByCategory(): Promise<Record<string, SkillDto[]>> {
    const grouped = await this.repo.listByCategory();
    return Object.fromEntries(
      Object.entries(grouped).map(([k, v]) => [k, v.map(SkillMapper.toDto)]),
    );
  }
}

DI.register(DI_TOKENS.SkillsService, () => {
  const repo = DI.resolve<ISkillsRepository>(DI_TOKENS.SkillsRepo);
  return { commands: new SkillsCommandService(repo), queries: new SkillsQueryService(repo) };
});

export interface SkillsService {
  commands: SkillsCommandService;
  queries: SkillsQueryService;
}
export const skillsService = () => DI.resolve<SkillsService>(DI_TOKENS.SkillsService);
