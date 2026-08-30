import { JsonRepository } from "@/repositories/base.json.repository";
import type { CertificationProps } from "../domain/certification.entity";
import type { ICertificationsRepository } from "./certification.repository";

export class CertificationsJsonRepository
  extends JsonRepository<CertificationProps>
  implements ICertificationsRepository
{
  constructor() {
    super("certifications");
  }
}

