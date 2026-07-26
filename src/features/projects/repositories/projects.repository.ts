import type { Repository } from "@/repositories/base.json.repository";
import type { ProjectProps } from "../domain/project.entity";

export interface IProjectsRepository extends Repository<ProjectProps> {
  findBySlug(slug: string): Promise<ProjectProps | null>;
  listPublished(): Promise<ProjectProps[]>;
}
