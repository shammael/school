import { UUID } from 'src/brands';
import { ClassroomEntity } from 'src/modules/classroom/entities/classroom.entity';
import { EvaluationEntity } from 'src/modules/evaluation/entities/evaluation.entity';
import { ProgramEntity } from 'src/modules/program/entities/program.entity';
import { SchoolEntity } from 'src/modules/school/entities/school.entity';

export class SubjectEntity {
  id: UUID;
  name: string;
  classrooms?: ClassroomEntity[];
  evaluations?: EvaluationEntity[];
  schoolID: UUID;
  school?: SchoolEntity;
  programs?: ProgramEntity[];
}
