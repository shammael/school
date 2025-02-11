import { Profile, User, UserRole, UserRoleBinding } from '@prisma/client';
import { UserRoleBindingEntity } from '../entities';
import { uuidAdapter } from 'src/commons/adapters';
import { prismaUserRoleEntityAdapter } from 'src/modules/user_role/adapters/prisma_user_role_entity.adapter';
import { prismaUserEntityAdapter } from 'src/modules/user/adapters/prisma_user_entity.adapter';
import { prismaProfileEntityAdapter } from 'src/modules/profile/adapters/prisma_profile_entity.adapter';

export const prismaUserRoleBindingEntityAdapter = (
  document: UserRoleBinding & {
    role?: UserRole;
    user?: User;
    profile?: Profile;
  },
): UserRoleBindingEntity => {
  if (document) {
    return {
      createdAt: document.created_at,
      id: uuidAdapter(document.id),
      profile: document.profile
        ? prismaProfileEntityAdapter(document.profile)
        : undefined,
      roleID: uuidAdapter(document.role_id),
      updatedAt: document.updated_at,
      userID: uuidAdapter(document.user_id),
      role: document.role
        ? prismaUserRoleEntityAdapter(document.role)
        : undefined,
      user: document.user ? prismaUserEntityAdapter(document.user) : undefined,
    };
  }
};
