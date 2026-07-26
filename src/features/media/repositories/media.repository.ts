import type { Repository } from "@/repositories/base.json.repository";
import type { MediaAssetProps } from "../domain/media.entity";

export interface IMediaRepository extends Repository<MediaAssetProps> {}
