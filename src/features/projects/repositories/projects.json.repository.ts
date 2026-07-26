import { JsonRepository } from "@/repositories/base.json.repository";
import type { ProjectProps } from "../domain/project.entity";
import type { IProjectsRepository } from "./projects.repository";

export class ProjectsJsonRepository
  extends JsonRepository<ProjectProps>
  implements IProjectsRepository
{
  constructor() {
    super("projects");
  }
  async findBySlug(slug: string): Promise<ProjectProps | null> {
    const rows = await this.list();
    return rows.find((r) => r.slug === slug) ?? null;
  }
  async listPublished(): Promise<ProjectProps[]> {
    const rows = await this.list();
    return rows
      .filter((r) => r.status === "published")
      .sort((a, b) => a.order - b.order || b.updatedAt.localeCompare(a.updatedAt));
  }
}
