import type { ExperimentProps } from "../domain/experiment.entity";

export interface IExperimentsRepository {
  list(): Promise<ExperimentProps[]>;
  get(id: string): Promise<ExperimentProps>;
  findBySlug(slug: string): Promise<ExperimentProps | null>;
  create(props: ExperimentProps): Promise<ExperimentProps>;
  update(id: string, patch: Partial<ExperimentProps>): Promise<ExperimentProps>;
  delete(id: string): Promise<void>;
}
