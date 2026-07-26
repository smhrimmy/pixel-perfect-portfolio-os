import { AggregateRoot } from "@/domain/shared/entity";
import { Slug, newId, nowIso } from "@/domain/shared/value-objects";
import { ValidationError } from "@/domain/shared/errors";
import { makeEvent } from "@/domain/events/domain-event";

export type ArticleStatus = "draft" | "published" | "archived";

export interface ArticleProps {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  markdown: string;
  coverImageUrl: string | null;
  status: ArticleStatus;
  template: string;
  tags: string[];
  publishedAt: string | null;
  authorId: string | null;
  createdAt: string;
  updatedAt: string;
}

export class Article extends AggregateRoot<ArticleProps> {
  static create(input: Omit<ArticleProps, "id" | "createdAt" | "updatedAt" | "publishedAt"> & {
    publishedAt?: string | null;
  }): Article {
    if (!input.title.trim()) throw new ValidationError("title is required");
    Slug.create(input.slug);
    const now = nowIso();
    const article = new Article({
      ...input,
      publishedAt:
        input.publishedAt ?? (input.status === "published" ? now : null),
      id: newId(),
      createdAt: now,
      updatedAt: now,
    });
    article.record(makeEvent("article.created", article.id, article.snapshot()));
    return article;
  }
  publish(): void {
    if (this.props.status === "published") return;
    this.props.status = "published";
    this.props.publishedAt = nowIso();
    this.props.updatedAt = this.props.publishedAt;
    this.record(makeEvent("article.published", this.id, { id: this.id }));
  }
}
