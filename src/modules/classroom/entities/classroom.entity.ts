import { UUID } from 'src/brands';
import { SchoolEntity } from 'src/modules/school/entities/school.entity';
import { ClassroomStatus } from '../enums';
import { SubjectEntity } from 'src/modules/subject/entities';
import { EvaluationEntity } from 'src/modules/evaluation/entities/evaluation.entity';

export class ClassroomEntity {
  id: UUID;
  grade: number;
  name: string;
  schoolID: UUID;
  school?: SchoolEntity;
  status: ClassroomStatus;
  year: number;
  subjects?: SubjectEntity[];
  evaluations?: EvaluationEntity[];
}
