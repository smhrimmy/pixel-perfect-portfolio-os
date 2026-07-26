import { JsonRepository } from "@/repositories/base.json.repository";
import type { ExperienceProps } from "../domain/experience.entity";
import type { IExperienceRepository } from "./experience.repository";

export class ExperienceJsonRepository
  extends JsonRepository<ExperienceProps>
  implements IExperienceRepository
{
  constructor() {
    super("experience");
  }
  async listOrdered(): Promise<ExperienceProps[]> {
    const rows = await this.list();
    return rows.slice().sort((a, b) => {
      if (a.order !== b.order) return a.order - b.order;
      const aEnd = a.endDate ?? "9999-12-31";
      const bEnd = b.endDate ?? "9999-12-31";
      return bEnd.localeCompare(aEnd);
    });
  }
}
