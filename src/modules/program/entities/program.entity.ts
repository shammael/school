import { UUID } from 'src/brands';
import { ProgramStatus } from '../enums';
import { EvaluationEntity } from 'src/modules/evaluation/entities/evaluation.entity';

//   name        String
export class ProgramEntity {
  id: UUID;
  schoolID: UUID;
  status: ProgramStatus;
  evaluations: EvaluationEntity[];
  createdAt: Date;
  updatedAt: Date;
  name: string;
}
