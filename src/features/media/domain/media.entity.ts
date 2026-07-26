import { AggregateRoot } from "@/domain/shared/entity";
import { newId, nowIso } from "@/domain/shared/value-objects";
import { ValidationError } from "@/domain/shared/errors";
import { makeEvent } from "@/domain/events/domain-event";
import type { MediaVariant } from "../schemas/media.schema";

export type MediaKind = "image" | "video" | "embed" | "file";

export interface MediaAssetProps {
  id: string;
  url: string;
  alt: string;
  kind: MediaKind;
  width: number | null;
  height: number | null;
  tags: string[];
  thumbnailUrl: string | null;
  sizeBytes: number | null;
  storagePath: string | null;
  mimeType: string | null;
  folder: string | null;
  variants: MediaVariant[];
  createdAt: string;
  updatedAt: string;
}

const URL_RE = /^https?:\/\/\S+$/i;

export class MediaAsset extends AggregateRoot<MediaAssetProps> {
  static create(
    input: Omit<MediaAssetProps, "id" | "createdAt" | "updatedAt">,
  ): MediaAsset {
    if (!URL_RE.test(input.url)) throw new ValidationError("Invalid URL");
    const now = nowIso();
    const asset = new MediaAsset({ ...input, id: newId(), createdAt: now, updatedAt: now });
    asset.record(makeEvent("media.created", asset.id, { url: input.url }));
    return asset;
  }
}
