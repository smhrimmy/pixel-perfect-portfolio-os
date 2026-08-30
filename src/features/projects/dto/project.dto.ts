import type { ProjectProps, ProjectStatus } from "../domain/project.entity";

export interface ProjectDto {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  tags: string[];
  coverImageUrl: string | null;
  liveUrl: string | null;
  repoUrl: string | null;
  status: ProjectStatus;
  featured: boolean;
  order: number;
  category?: string;
  technologies?: string[];
  techStack?: any;
  role?: string;
  duration?: string;
  problem?: string;
  goals?: string[];
  constraints?: string[];
  architecture?: string;
  challenges?: any[];
  solutions?: any[];
  results?: string[];
  lessons?: string[];
  threeConfig?: any;
  createdAt: string;
  updatedAt: string;
}

export type ProjectListDto = ProjectDto[];

export type ProjectPersistence = ProjectProps;
