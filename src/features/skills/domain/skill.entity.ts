import { AggregateRoot } from "@/domain/shared/entity";
import { newId, nowIso } from "@/domain/shared/value-objects";
import { ValidationError } from "@/domain/shared/errors";
import { makeEvent } from "@/domain/events/domain-event";

export type SkillLevel = "beginner" | "intermediate" | "advanced" | "expert";

export interface SkillProps {
  id: string;
  name: string;
  category: string;
  level: SkillLevel;
  years: number;
  iconUrl: string | null;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export class Skill extends AggregateRoot<SkillProps> {
  static create(input: Omit<SkillProps, "id" | "createdAt" | "updatedAt">): Skill {
    if (!input.name.trim()) throw new ValidationError("name required");
    if (input.years < 0) throw new ValidationError("years must be >= 0");
    const now = nowIso();
    const s = new Skill({ ...input, id: newId(), createdAt: now, updatedAt: now });
    s.record(makeEvent("skill.created", s.id, s.snapshot()));
    return s;
  }
}
