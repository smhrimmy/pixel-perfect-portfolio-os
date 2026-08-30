import { DI, DI_TOKENS } from "@/providers/di.provider";
import { withUnitOfWork } from "@/application/unit-of-work";
import { Certification } from "../domain/certification.entity";
import { CertificationMapper } from "../mappers/certification.mapper";
import { CertificationsJsonRepository } from "../repositories/certifications.json.repository";
import type { ICertificationsRepository } from "../repositories/certification.repository";
import type { CertificationCreateInput, CertificationUpdateInput } from "../schemas/certification.schema";
import type { CertificationDto } from "../dto/certification.dto";

DI.register<ICertificationsRepository>(DI_TOKENS.CertificationsRepo, () => new CertificationsJsonRepository());

export class CertificationsCommandService {
  constructor(private readonly repo: ICertificationsRepository) {}
  create(input: CertificationCreateInput): Promise<CertificationDto> {
    return withUnitOfWork(async () => {
      const entity = Certification.create(input);
      return CertificationMapper.toDto(await this.repo.create(CertificationMapper.toPersistence(entity)));
    });
  }
  update(input: CertificationUpdateInput): Promise<CertificationDto> {
    return withUnitOfWork(async () => {
      const { id, ...patch } = input;
      return CertificationMapper.toDto(await this.repo.update(id, patch));
    });
  }
  async delete(id: string): Promise<{ id: string }> {
    await this.repo.delete(id);
    return { id };
  }
}

export class CertificationsQueryService {
  constructor(private readonly repo: ICertificationsRepository) {}
  async list(): Promise<CertificationDto[]> {
    return (await this.repo.list()).map(CertificationMapper.toDto);
  }
  async get(id: string): Promise<CertificationDto> {
    return CertificationMapper.toDto(await this.repo.get(id));
  }
}

DI.register(DI_TOKENS.CertificationsService, () => {
  const repo = DI.resolve<ICertificationsRepository>(DI_TOKENS.CertificationsRepo);
  return { commands: new CertificationsCommandService(repo), queries: new CertificationsQueryService(repo) };
});

export interface CertificationsService {
  commands: CertificationsCommandService;
  queries: CertificationsQueryService;
}
export const certificationsService = () => DI.resolve<CertificationsService>(DI_TOKENS.CertificationsService);
