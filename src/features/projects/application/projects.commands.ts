import { ConflictError } from "@/domain/shared/errors";
import { withUnitOfWork } from "@/application/unit-of-work";
import { Project } from "../domain/project.entity";
import { ProjectMapper } from "../mappers/project.mapper";
import type { IProjectsRepository } from "../repositories/projects.repository";
import type { ProjectCreateInput, ProjectUpdateInput } from "../schemas/project.schema";
import type { ProjectDto } from "../dto/project.dto";

export class ProjectsCommandService {
  constructor(private readonly repo: IProjectsRepository) {}

  async create(input: ProjectCreateInput): Promise<ProjectDto> {
    return withUnitOfWork(async (uow) => {
      const existing = await this.repo.findBySlug(input.slug);
      if (existing) throw new ConflictError(`Project slug already exists: ${input.slug}`);
      const entity = Project.create(input);
      const row = await this.repo.create(ProjectMapper.toPersistence(entity));
      for (const e of entity.pullEvents()) uow.record(e);
      return ProjectMapper.toDto(row);
    });
  }

  async update(input: ProjectUpdateInput): Promise<ProjectDto> {
    return withUnitOfWork(async () => {
      const { id, ...patch } = input;
      if (patch.slug) {
        const other = await this.repo.findBySlug(patch.slug);
        if (other && other.id !== id) {
          throw new ConflictError(`Slug already used: ${patch.slug}`);
        }
      }
      const row = await this.repo.update(id, patch);
      return ProjectMapper.toDto(row);
    });
  }

  async delete(id: string): Promise<{ id: string }> {
    return withUnitOfWork(async (uow) => {
      await this.repo.delete(id);
      uow.record({
        name: "project.deleted",
        occurredAt: new Date().toISOString(),
        aggregateId: id,
        payload: { id },
      });
      return { id };
    });
  }
}
