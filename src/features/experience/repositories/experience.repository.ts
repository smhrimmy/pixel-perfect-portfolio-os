import type { Repository } from "@/repositories/base.json.repository";
import type { ExperienceProps } from "../domain/experience.entity";

export interface IExperienceRepository extends Repository<ExperienceProps> {
  listOrdered(): Promise<ExperienceProps[]>;
}
