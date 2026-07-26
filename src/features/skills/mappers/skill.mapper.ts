import { Skill, type SkillProps } from "../domain/skill.entity";
import type { SkillDto } from "../dto/skill.dto";

export const SkillMapper = {
  toDto(row: SkillProps | Skill): SkillDto {
    return row instanceof Skill ? row.snapshot() : { ...row };
  },
  toPersistence(entity: Skill): SkillProps {
    return entity.snapshot();
  },
};
