import type { IProjectsRepository } from "../repositories/projects.repository";
import { ProjectMapper } from "../mappers/project.mapper";
import type { ProjectDto } from "../dto/project.dto";
import { NotFoundError } from "@/domain/shared/errors";

export class ProjectsQueryService {
  constructor(private readonly repo: IProjectsRepository) {}
  async list(): Promise<ProjectDto[]> {
    const rows = await this.repo.list();
    return rows.map((r) => ProjectMapper.toDto(r));
  }
  async listPublished(): Promise<ProjectDto[]> {
    const rows = await this.repo.listPublished();
    return rows.map((r) => ProjectMapper.toDto(r));
  }
  async get(id: string): Promise<ProjectDto> {
    const row = await this.repo.get(id);
    return ProjectMapper.toDto(row);
  }
  async findBySlug(slug: string): Promise<ProjectDto> {
    const row = await this.repo.findBySlug(slug);
    if (!row) throw new NotFoundError("projects", slug);
    return ProjectMapper.toDto(row);
  }
}
