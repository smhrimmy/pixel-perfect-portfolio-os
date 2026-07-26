import { JsonRepository } from "@/repositories/base.json.repository";
import type { MediaAssetProps } from "../domain/media.entity";
import type { IMediaRepository } from "./media.repository";

export class MediaJsonRepository
  extends JsonRepository<MediaAssetProps>
  implements IMediaRepository
{
  constructor() {
    super("media");
  }
}
