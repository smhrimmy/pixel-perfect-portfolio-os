import type { ExperimentProps } from "../domain/experiment.entity";

export interface ExperimentDto {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  category: string;
  techStack: string[];
  githubUrl: string | null;
  demoUrl: string | null;
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export type ExperimentListDto = ExperimentDto[];
export type ExperimentPersistence = ExperimentProps;
