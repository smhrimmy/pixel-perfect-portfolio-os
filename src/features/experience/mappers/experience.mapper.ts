import { Experience, type ExperienceProps } from "../domain/experience.entity";
import type { ExperienceDto } from "../dto/experience.dto";

export const ExperienceMapper = {
  toDto(row: ExperienceProps | Experience): ExperienceDto {
    return row instanceof Experience ? row.snapshot() : { ...row };
  },
  toPersistence(entity: Experience): ExperienceProps {
    return entity.snapshot();
  },
};
