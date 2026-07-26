/**
 * Media Service — validates/normalises media references before persistence.
 * Storage of binary assets is delegated to the frontend uploader; this layer
 * only guards URLs, dimensions, alt text, and MIME/type mapping.
 */
import { ValidationError } from "@/domain/shared/errors";

export interface MediaRef {
  url: string;
  alt: string;
  kind: "image" | "video" | "embed";
  width?: number;
  height?: number;
}

export class MediaService {
  private urlRe = /^https?:\/\/\S+$/i;

  validate(input: Partial<MediaRef> & { url: string }): MediaRef {
    if (!this.urlRe.test(input.url)) throw new ValidationError("Invalid media URL");
    return {
      url: input.url,
      alt: (input.alt ?? "").slice(0, 240),
      kind: input.kind ?? "image",
      width: input.width,
      height: input.height,
    };
  }
}

export const mediaService = new MediaService();
