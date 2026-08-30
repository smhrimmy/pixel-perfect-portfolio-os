import { DI, DI_TOKENS } from "@/providers/di.provider";
import { withUnitOfWork } from "@/application/unit-of-work";
import { Experiment } from "../domain/experiment.entity";
import { ExperimentMapper } from "../mappers/experiment.mapper";
import { ExperimentsJsonRepository } from "../repositories/experiments.json.repository";
import type { IExperimentsRepository } from "../repositories/experiment.repository";
import type { ExperimentCreateInput, ExperimentUpdateInput } from "../schemas/experiment.schema";
import type { ExperimentDto } from "../dto/experiment.dto";

DI.register<IExperimentsRepository>(DI_TOKENS.ExperimentsRepo, () => new ExperimentsJsonRepository());

export class ExperimentsCommandService {
  constructor(private readonly repo: IExperimentsRepository) {}
  create(input: ExperimentCreateInput): Promise<ExperimentDto> {
    return withUnitOfWork(async () => {
      const entity = Experiment.create(input);
      return ExperimentMapper.toDto(await this.repo.create(ExperimentMapper.toPersistence(entity)));
    });
  }
  update(input: ExperimentUpdateInput): Promise<ExperimentDto> {
    return withUnitOfWork(async () => {
      const { id, ...patch } = input;
      return ExperimentMapper.toDto(await this.repo.update(id, patch));
    });
  }
  async delete(id: string): Promise<{ id: string }> {
    await this.repo.delete(id);
    return { id };
  }
}

export class ExperimentsQueryService {
  constructor(private readonly repo: IExperimentsRepository) {}
  async list(): Promise<ExperimentDto[]> {
    return (await this.repo.list()).map(ExperimentMapper.toDto);
  }
  async get(id: string): Promise<ExperimentDto> {
    return ExperimentMapper.toDto(await this.repo.get(id));
  }
  async findBySlug(slug: string): Promise<ExperimentDto | null> {
    const item = await this.repo.findBySlug(slug);
    return item ? ExperimentMapper.toDto(item) : null;
  }
}

DI.register(DI_TOKENS.ExperimentsService, () => {
  const repo = DI.resolve<IExperimentsRepository>(DI_TOKENS.ExperimentsRepo);
  return { commands: new ExperimentsCommandService(repo), queries: new ExperimentsQueryService(repo) };
});

export interface ExperimentsService {
  commands: ExperimentsCommandService;
  queries: ExperimentsQueryService;
}
export const experimentsService = () => DI.resolve<ExperimentsService>(DI_TOKENS.ExperimentsService);
