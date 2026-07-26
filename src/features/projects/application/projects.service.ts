import { DI, DI_TOKENS } from "@/providers/di.provider";
import { ProjectsJsonRepository } from "../repositories/projects.json.repository";
import { ProjectsCommandService } from "./projects.commands";
import { ProjectsQueryService } from "./projects.queries";
import type { IProjectsRepository } from "../repositories/projects.repository";

DI.register<IProjectsRepository>(DI_TOKENS.ProjectsRepo, () => new ProjectsJsonRepository());
DI.register(DI_TOKENS.ProjectsService, () => {
  const repo = DI.resolve<IProjectsRepository>(DI_TOKENS.ProjectsRepo);
  return {
    commands: new ProjectsCommandService(repo),
    queries: new ProjectsQueryService(repo),
  };
});

export interface ProjectsService {
  commands: ProjectsCommandService;
  queries: ProjectsQueryService;
}

export function projectsService(): ProjectsService {
  return DI.resolve<ProjectsService>(DI_TOKENS.ProjectsService);
}
