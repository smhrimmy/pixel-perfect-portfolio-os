import { AggregateRoot } from "@/domain/shared/entity";
import { Slug, newId, nowIso } from "@/domain/shared/value-objects";
import { ValidationError } from "@/domain/shared/errors";
import { makeEvent } from "@/domain/events/domain-event";

export type ProjectStatus = "draft" | "published" | "archived";

export interface ProjectProps {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  tags: string[];
  coverImageUrl: string | null;
  liveUrl: string | null;
  repoUrl: string | null;
  status: ProjectStatus;
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export class Project extends AggregateRoot<ProjectProps> {
  static create(input: Omit<ProjectProps, "id" | "createdAt" | "updatedAt">): Project {
    if (!input.title.trim()) throw new ValidationError("title is required");
    Slug.create(input.slug); // throws on invalid
    const now = nowIso();
    const project = new Project({ ...input, id: newId(), createdAt: now, updatedAt: now });
    project.record(makeEvent("project.created", project.id, project.snapshot()));
    return project;
  }
  publish(): void {
    if (this.props.status === "published") return;
    this.props.status = "published";
    this.props.updatedAt = nowIso();
    this.record(makeEvent("project.published", this.id, { id: this.id }));
  }
  archive(): void {
    this.props.status = "archived";
    this.props.updatedAt = nowIso();
    this.record(makeEvent("project.archived", this.id, { id: this.id }));
  }
}
