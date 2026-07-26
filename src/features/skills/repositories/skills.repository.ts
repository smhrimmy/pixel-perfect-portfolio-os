import type { Repository } from "@/repositories/base.json.repository";
import type { SkillProps } from "../domain/skill.entity";

export interface ISkillsRepository extends Repository<SkillProps> {
  listByCategory(): Promise<Record<string, SkillProps[]>>;
}
