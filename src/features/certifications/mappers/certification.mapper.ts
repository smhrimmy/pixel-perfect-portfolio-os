import { Certification, type CertificationProps } from "../domain/certification.entity";
import type { CertificationDto, CertificationPersistence } from "../dto/certification.dto";

export class CertificationMapper {
  static toDto(props: CertificationProps): CertificationDto {
    return { ...props };
  }
  static toDomain(persistence: CertificationPersistence): Certification {
    return Certification.fromProps(persistence);
  }
  static toPersistence(entity: Certification): CertificationPersistence {
    return entity.snapshot();
  }
}
