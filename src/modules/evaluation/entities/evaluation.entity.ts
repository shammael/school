import { UUID } from 'src/brands';
import { ClassroomEntity } from 'src/modules/classroom/entities/classroom.entity';
import { MediaEntity } from 'src/modules/media/entities/media.entity';
import { ProgramEntity } from 'src/modules/program/entities/program.entity';
import { SubjectEntity } from 'src/modules/subject/entities';
import { UserEvaluationEntity } from 'src/modules/user_evaluation/entities';

export class EvaluationEntity {
  id: UUID;
  classroomID: UUID;
  classroom?: ClassroomEntity;
  subjectID: UUID;
  subject?: SubjectEntity;
  maxNote: number;
  userEvaluations: UserEvaluationEntity[];
  programID: UUID;
  program?: ProgramEntity;
}
