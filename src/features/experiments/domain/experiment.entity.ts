import { AggregateRoot } from "@/domain/shared/entity";
import { newId, nowIso, Slug } from "@/domain/shared/value-objects";
import { ValidationError } from "@/domain/shared/errors";
import { makeEvent } from "@/domain/events/domain-event";

export interface ExperimentProps {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  category: string;
  techStack: string[];
  githubUrl: string | null;
  demoUrl: string | null;
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export class Experiment extends AggregateRoot<ExperimentProps> {
  static create(input: Omit<ExperimentProps, "id" | "createdAt" | "updatedAt">): Experiment {
    if (!input.title.trim()) throw new ValidationError("title is required");
    Slug.create(input.slug);
    const now = nowIso();
    const exp = new Experiment({ ...input, id: newId(), createdAt: now, updatedAt: now });
    exp.record(makeEvent("experiment.created", exp.id, exp.snapshot()));
    return exp;
  }
}
