import { Media, Pid, User } from '@prisma/client';
import { PidEntity } from '../entities/pid.entity';
import { pidAdapter, uuidAdapter } from 'src/commons/adapters';
import { prismaUserEntityAdapter } from 'src/modules/user/adapters/prisma_user_entity.adapter';
import { prismaMediaEntityAdapter } from 'src/modules/media/adapters';

export const prismaPidEntityAdapter = (
  document: Pid & {
    user?: User;
    image?: Media;
  },
): PidEntity => {
  if (document) {
    return {
      id: uuidAdapter(document.id),
      number: pidAdapter(document.number),
      createdAt: document.created_at,
      updatedAt: document.updated_at,
      userID: uuidAdapter(document.user_id),
      user: document.user ? prismaUserEntityAdapter(document.user) : undefined,
      imageID: uuidAdapter(document.image_id),
      image: document.image
        ? prismaMediaEntityAdapter(document.image)
        : undefined,
    };
  }
};
