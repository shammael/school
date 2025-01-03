// id          String        @id @default(uuid())
//   school_id   String
//   school      School        @relation(fields: [school_id], references: [id])
//   status      ProgramStatus
//   students    Student[]
//   evaluations Evaluation[]
//   created_at  DateTime      @default(now())
//   updated_at  DateTime      @updatedAt

import { UUID } from 'src/brands';
import { ProgramStatus } from '../enums';

//   name        String
export class ProgramEntity {
  id: UUID;
  schoolID: UUID;
  status: ProgramStatus;
  students: string[];
  evaluations: string[];
  created_at: Date;
  updated_at: Date;
  name: string;
}
