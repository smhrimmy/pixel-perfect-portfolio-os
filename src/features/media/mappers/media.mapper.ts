import { MediaAsset, type MediaAssetProps } from "../domain/media.entity";
import type { MediaAssetDto } from "../dto/media.dto";

function normalize(row: Partial<MediaAssetProps>): MediaAssetProps {
  return {
    id: row.id!,
    url: row.url ?? "",
    alt: row.alt ?? "",
    kind: row.kind ?? "image",
    width: row.width ?? null,
    height: row.height ?? null,
    tags: row.tags ?? [],
    thumbnailUrl: row.thumbnailUrl ?? null,
    sizeBytes: row.sizeBytes ?? null,
    storagePath: row.storagePath ?? null,
    mimeType: row.mimeType ?? null,
    folder: row.folder ?? null,
    variants: row.variants ?? [],
    createdAt: row.createdAt!,
    updatedAt: row.updatedAt!,
  };
}

export const MediaMapper = {
  toDto(row: MediaAssetProps | MediaAsset): MediaAssetDto {
    const snap = row instanceof MediaAsset ? row.snapshot() : { ...row };
    return normalize(snap);
  },
  toPersistence(entity: MediaAsset): MediaAssetProps {
    return entity.snapshot();
  },
};
