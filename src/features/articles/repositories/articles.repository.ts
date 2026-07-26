import type { Repository } from "@/repositories/base.json.repository";
import type { ArticleProps } from "../domain/article.entity";

export interface IArticlesRepository extends Repository<ArticleProps> {
  findBySlug(slug: string): Promise<ArticleProps | null>;
  listPublished(): Promise<ArticleProps[]>;
}
