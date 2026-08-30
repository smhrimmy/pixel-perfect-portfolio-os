import type { CertificationProps } from "../domain/certification.entity";

export interface CertificationDto {
  id: string;
  name: string;
  issuer: string;
  description: string | null;
  issueDate: string;
  expirationDate: string | null;
  credentialId: string | null;
  url: string | null;
  skills: string[];
  order: number;
  createdAt: string;
  updatedAt: string;
}

export type CertificationListDto = CertificationDto[];
export type CertificationPersistence = CertificationProps;
