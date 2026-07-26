import { JsonRepository } from "@/repositories/base.json.repository";
import type { SkillProps } from "../domain/skill.entity";
import type { ISkillsRepository } from "./skills.repository";

export class SkillsJsonRepository
  extends JsonRepository<SkillProps>
  implements ISkillsRepository
{
  constructor() {
    super("skills");
  }
  async listByCategory(): Promise<Record<string, SkillProps[]>> {
    const rows = await this.list();
    return rows
      .slice()
      .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name))
      .reduce<Record<string, SkillProps[]>>((acc, s) => {
        (acc[s.category] ??= []).push(s);
        return acc;
      }, {});
  }
}
