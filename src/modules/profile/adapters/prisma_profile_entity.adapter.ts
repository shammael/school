import { Media, Profile, User, UserRoleBinding } from '@prisma/client';
import { ProfileEntity } from '../entities/profile.entity';
import { uuidAdapter } from 'src/commons/adapters';
import { prismaMediaEntityAdapter } from 'src/modules/media/adapters';
import { prismaUserEntityAdapter } from 'src/modules/user/adapters/prisma_user_entity.adapter';
import { prismaUserRoleBindingEntityAdapter } from 'src/modules/user_role_binding/adapters/prisma_user_role_binding_entity.adapter';
import { Hash } from 'src/brands';

export const prismaProfileEntityAdapter = (
  document: Profile & {
    image?: Media;
    userRoleBinding?: UserRoleBinding;
  },
): ProfileEntity => {
  if (document) {
    return {
      defaultPassword: document.default_password,
      id: uuidAdapter(document.id),
      imageID: document.image_id ? uuidAdapter(document.image_id) : undefined,
      image: document.image
        ? prismaMediaEntityAdapter(document.image)
        : undefined,
      password: document.password as Hash,
      userRoleBindingID: uuidAdapter(document.user_role_binding_id),
      userRoleBinding: document.userRoleBinding
        ? prismaUserRoleBindingEntityAdapter(document.userRoleBinding)
        : undefined,
    };
  }
};
