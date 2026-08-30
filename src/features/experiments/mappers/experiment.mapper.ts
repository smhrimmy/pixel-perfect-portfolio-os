import { Experiment, type ExperimentProps } from "../domain/experiment.entity";
import type { ExperimentDto, ExperimentPersistence } from "../dto/experiment.dto";

export class ExperimentMapper {
  static toDto(props: ExperimentProps): ExperimentDto {
    return { ...props };
  }
  static toDomain(persistence: ExperimentPersistence): Experiment {
    return Experiment.fromProps(persistence);
  }
  static toPersistence(entity: Experiment): ExperimentPersistence {
    return entity.snapshot();
  }
}
