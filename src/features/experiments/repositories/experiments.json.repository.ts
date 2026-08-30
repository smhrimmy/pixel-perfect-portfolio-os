import { JsonRepository } from "@/repositories/base.json.repository";
import type { ExperimentProps } from "../domain/experiment.entity";
import type { IExperimentsRepository } from "./experiment.repository";

export class ExperimentsJsonRepository
  extends JsonRepository<ExperimentProps>
  implements IExperimentsRepository
{
  constructor() {
    super("experiments");
  }
  async findBySlug(slug: string): Promise<ExperimentProps | null> {
    const all = await this.list();
    return all.find((e) => e.slug === slug) ?? null;
  }
}

