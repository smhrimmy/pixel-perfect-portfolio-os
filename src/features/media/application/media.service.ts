import { DI } from "@/providers/di.provider";
import { withUnitOfWork } from "@/application/unit-of-work";
import { MediaAsset } from "../domain/media.entity";
import { MediaMapper } from "../mappers/media.mapper";
import { MediaJsonRepository } from "../repositories/media.json.repository";
import type { IMediaRepository } from "../repositories/media.repository";
import type { MediaCreateInput, MediaUpdateInput } from "../schemas/media.schema";
import type { MediaAssetDto } from "../dto/media.dto";

export const MEDIA_TOKENS = {
  Repo: "repo.media",
  Service: "svc.media-lib",
} as const;

DI.register<IMediaRepository>(MEDIA_TOKENS.Repo, () => new MediaJsonRepository());

export class MediaCommandService {
  constructor(private readonly repo: IMediaRepository) {}
  create(input: MediaCreateInput): Promise<MediaAssetDto> {
    return withUnitOfWork(async () => {
      const entity = MediaAsset.create(input);
      return MediaMapper.toDto(await this.repo.create(MediaMapper.toPersistence(entity)));
    });
  }
  update(input: MediaUpdateInput): Promise<MediaAssetDto> {
    return withUnitOfWork(async () => {
      const { id, ...patch } = input;
      return MediaMapper.toDto(await this.repo.update(id, patch));
    });
  }
  async delete(id: string): Promise<{ id: string }> {
    await this.repo.delete(id);
    return { id };
  }
}
export class MediaQueryService {
  constructor(private readonly repo: IMediaRepository) {}
  async list(): Promise<MediaAssetDto[]> {
    return (await this.repo.list())
      .map(MediaMapper.toDto)
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }
  async get(id: string): Promise<MediaAssetDto> {
    return MediaMapper.toDto(await this.repo.get(id));
  }
}

DI.register(MEDIA_TOKENS.Service, () => {
  const repo = DI.resolve<IMediaRepository>(MEDIA_TOKENS.Repo);
  return { commands: new MediaCommandService(repo), queries: new MediaQueryService(repo) };
});

export interface MediaService {
  commands: MediaCommandService;
  queries: MediaQueryService;
}
export const mediaService = () => DI.resolve<MediaService>(MEDIA_TOKENS.Service);
