import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireAdmin } from "@/middleware/require-admin";
import { articlesService } from "../application/articles.service";
import { articleCreateSchema, articleUpdateSchema } from "../schemas/article.schema";

export const listPublishedArticlesJson = createServerFn({ method: "GET" }).handler(async () =>
  articlesService().queries.listPublished(),
);
export const listPublishedArticles = listPublishedArticlesJson;
export const getArticleBySlugJson = createServerFn({ method: "GET" })
  .validator((slug: string) => z.string().min(1).parse(slug))
  .handler(async ({ data }) => articlesService().queries.findBySlug(data));

export const listAllArticlesJson = createServerFn({ method: "GET" })
  .middleware([requireAdmin])
  .handler(async () => articlesService().queries.listAll());
export const getArticleJson = createServerFn({ method: "GET" })
  .middleware([requireAdmin])
  .validator((id: string) => z.string().min(1).parse(id))
  .handler(async ({ data }) => articlesService().queries.get(data));
export const createArticleJson = createServerFn({ method: "POST" })
  .middleware([requireAdmin])
  .validator((i: unknown) => articleCreateSchema.parse(i))
  .handler(async ({ data }) => articlesService().commands.create(data));
export const updateArticleJson = createServerFn({ method: "POST" })
  .middleware([requireAdmin])
  .validator((i: unknown) => articleUpdateSchema.parse(i))
  .handler(async ({ data }) => articlesService().commands.update(data));
export const deleteArticleJson = createServerFn({ method: "POST" })
  .middleware([requireAdmin])
  .validator((id: string) => z.string().min(1).parse(id))
  .handler(async ({ data }) => articlesService().commands.delete(data));
