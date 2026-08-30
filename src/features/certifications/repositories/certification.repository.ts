import type { CertificationProps } from "../domain/certification.entity";

export interface ICertificationsRepository {
  list(): Promise<CertificationProps[]>;
  get(id: string): Promise<CertificationProps>;
  create(props: CertificationProps): Promise<CertificationProps>;
  update(id: string, patch: Partial<CertificationProps>): Promise<CertificationProps>;
  delete(id: string): Promise<void>;
}
