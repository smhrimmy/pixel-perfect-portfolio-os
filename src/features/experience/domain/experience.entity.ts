import { AggregateRoot } from "@/domain/shared/entity";
import { newId, nowIso } from "@/domain/shared/value-objects";
import { ValidationError } from "@/domain/shared/errors";
import { makeEvent } from "@/domain/events/domain-event";

export type EmploymentType = "full-time" | "part-time" | "contract" | "freelance" | "internship";

export interface ExperienceProps {
  id: string;
  company: string;
  role: string;
  type: EmploymentType;
  location: string;
  startDate: string; // ISO
  endDate: string | null; // null = current
  summary: string;
  highlights: string[];
  tech: string[];
  order: number;
  createdAt: string;
  updatedAt: string;
}

export class Experience extends AggregateRoot<ExperienceProps> {
  static create(input: Omit<ExperienceProps, "id" | "createdAt" | "updatedAt">): Experience {
    if (!input.company.trim() || !input.role.trim()) {
      throw new ValidationError("company and role are required");
    }
    if (input.endDate && input.endDate < input.startDate) {
      throw new ValidationError("endDate cannot precede startDate");
    }
    const now = nowIso();
    const e = new Experience({ ...input, id: newId(), createdAt: now, updatedAt: now });
    e.record(makeEvent("experience.created", e.id, e.snapshot()));
    return e;
  }
}
