import { JsonRepository } from "@/repositories/base.json.repository";
import type { ArticleProps } from "../domain/article.entity";
import type { IArticlesRepository } from "./articles.repository";

export class ArticlesJsonRepository
  extends JsonRepository<ArticleProps>
  implements IArticlesRepository
{
  constructor() {
    super("articles");
  }
  async findBySlug(slug: string): Promise<ArticleProps | null> {
    const rows = await this.list();
    return rows.find((r) => r.slug === slug) ?? null;
  }
  async listPublished(): Promise<ArticleProps[]> {
    const rows = await this.list();
    return rows
      .filter((r) => r.status === "published")
      .sort((a, b) =>
        (b.publishedAt ?? b.updatedAt).localeCompare(a.publishedAt ?? a.updatedAt),
      );
  }
}
