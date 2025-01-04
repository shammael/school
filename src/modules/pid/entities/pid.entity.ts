// id         String   @id @default(uuid())
//   number     String   @unique
//   created_at DateTime @default(now())
//   updated_at DateTime @updatedAt
//   user_id    String   @unique
//   user       User     @relation(fields: [user_id], references: [id])
//   image_id   String?
//   image      Media?   @relation(fields: [image_id], references: [id])

import { Pid, UUID } from 'src/brands';
import { MediaEntity } from 'src/modules/media/entities/media.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';

export class PidEntity {
  id: UUID;
  number: Pid;
  createdAt: Date;
  updatedAt: Date;
  userID: UUID;
  user?: UserEntity;
  imageID?: UUID;
  image?: MediaEntity;
}
