// id            String     @id @default(uuid())
//   evaluation_id String
//   evaluation    Evaluation @relation(fields: [evaluation_id], references: [id])
//   note          Float
//   images        Media[]
//   user_id       String
//   user          User       @relation(fields: [user_id], references: [id])

import { UUID } from 'src/brands';
import { EvaluationEntity } from 'src/modules/evaluation/entities/evaluation.entity';
import { MediaEntity } from 'src/modules/media/entities/media.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';

export class UserEvaluationEntity {
  id: UUID;
  evaluationID: UUID;
  evaluation?: EvaluationEntity;
  note: number;
  images?: MediaEntity[];
  userID: UUID;
  user?: UserEntity;
}
