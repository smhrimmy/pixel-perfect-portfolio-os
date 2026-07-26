import { Article, type ArticleProps } from "../domain/article.entity";
import type { ArticleDto } from "../dto/article.dto";

export const ArticleMapper = {
  toDto(row: ArticleProps | Article): ArticleDto {
    return row instanceof Article ? row.snapshot() : { ...row };
  },
  toPersistence(entity: Article): ArticleProps {
    return entity.snapshot();
  },
};
