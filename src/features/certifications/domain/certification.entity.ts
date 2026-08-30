import { AggregateRoot } from "@/domain/shared/entity";
import { newId, nowIso } from "@/domain/shared/value-objects";
import { ValidationError } from "@/domain/shared/errors";
import { makeEvent } from "@/domain/events/domain-event";

export interface CertificationProps {
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

export class Certification extends AggregateRoot<CertificationProps> {
  static create(input: Omit<CertificationProps, "id" | "createdAt" | "updatedAt">): Certification {
    if (!input.name.trim()) throw new ValidationError("name is required");
    if (!input.issuer.trim()) throw new ValidationError("issuer is required");
    const now = nowIso();
    const cert = new Certification({ ...input, id: newId(), createdAt: now, updatedAt: now });
    cert.record(makeEvent("certification.created", cert.id, cert.snapshot()));
    return cert;
  }
}
