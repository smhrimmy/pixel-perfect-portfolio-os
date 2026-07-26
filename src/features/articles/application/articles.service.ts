import { ConflictError, NotFoundError } from "@/domain/shared/errors";
import { DI, DI_TOKENS } from "@/providers/di.provider";
import { withUnitOfWork } from "@/application/unit-of-work";
import { Article } from "../domain/article.entity";
import { ArticleMapper } from "../mappers/article.mapper";
import { ArticlesJsonRepository } from "../repositories/articles.json.repository";
import type { IArticlesRepository } from "../repositories/articles.repository";
import type { ArticleCreateInput, ArticleUpdateInput } from "../schemas/article.schema";
import type { ArticleDto } from "../dto/article.dto";

DI.register<IArticlesRepository>(DI_TOKENS.ArticlesRepo, () => new ArticlesJsonRepository());

export class ArticlesCommandService {
  constructor(private readonly repo: IArticlesRepository) {}

  create(input: ArticleCreateInput): Promise<ArticleDto> {
    return withUnitOfWork(async () => {
      if (await this.repo.findBySlug(input.slug)) {
        throw new ConflictError(`Article slug in use: ${input.slug}`);
      }
      const entity = Article.create(input);
      return ArticleMapper.toDto(await this.repo.create(ArticleMapper.toPersistence(entity)));
    });
  }

  update(input: ArticleUpdateInput): Promise<ArticleDto> {
    return withUnitOfWork(async () => {
      const { id, ...patch } = input;
      if (patch.slug) {
        const other = await this.repo.findBySlug(patch.slug);
        if (other && other.id !== id) throw new ConflictError(`Slug in use: ${patch.slug}`);
      }
      const current = await this.repo.get(id);
      const publishedAt =
        patch.status === "published"
          ? current.publishedAt ?? new Date().toISOString()
          : patch.status === "draft" || patch.status === "archived"
            ? null
            : current.publishedAt;
      return ArticleMapper.toDto(await this.repo.update(id, { ...patch, publishedAt }));
    });
  }

  async delete(id: string): Promise<{ id: string }> {
    await this.repo.delete(id);
    return { id };
  }
}

export class ArticlesQueryService {
  constructor(private readonly repo: IArticlesRepository) {}
  async listAll(): Promise<ArticleDto[]> {
    return (await this.repo.list()).map(ArticleMapper.toDto);
  }
  async listPublished(): Promise<ArticleDto[]> {
    return (await this.repo.listPublished()).map(ArticleMapper.toDto);
  }
  async get(id: string): Promise<ArticleDto> {
    return ArticleMapper.toDto(await this.repo.get(id));
  }
  async findBySlug(slug: string): Promise<ArticleDto> {
    const row = await this.repo.findBySlug(slug);
    if (!row) throw new NotFoundError("articles", slug);
    return ArticleMapper.toDto(row);
  }
}

DI.register(DI_TOKENS.ArticlesService, () => {
  const repo = DI.resolve<IArticlesRepository>(DI_TOKENS.ArticlesRepo);
  return { commands: new ArticlesCommandService(repo), queries: new ArticlesQueryService(repo) };
});

export interface ArticlesService {
  commands: ArticlesCommandService;
  queries: ArticlesQueryService;
}
export const articlesService = () => DI.resolve<ArticlesService>(DI_TOKENS.ArticlesService);
