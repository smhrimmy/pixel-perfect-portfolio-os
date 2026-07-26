import { Project, type ProjectProps } from "../domain/project.entity";
import type { ProjectDto } from "../dto/project.dto";

export const ProjectMapper = {
  toDto(entity: Project | ProjectProps): ProjectDto {
    const p = entity instanceof Project ? entity.snapshot() : entity;
    return { ...p };
  },
  toDomain(row: ProjectProps): Project {
    return new (class extends Project {})(row);
  },
  toPersistence(entity: Project): ProjectProps {
    return entity.snapshot();
  },
};
