// id          String          @id @default(uuid())
// grade       Int
// name        String
// school_id   String
// school      School          @relation(fields: [school_id], references: [id])
// status      ClassroomStatus
// teachers    Teacher[]
// students    Student[]
// year        Int
// subjects    Subject[]
// subjects    Subject[]
//   evaluations Evaluation[]

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
