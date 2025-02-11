import { School, UserRole } from '@prisma/client';
import { UserRoleEntity } from '../entities';
import { uuidAdapter } from 'src/commons/adapters/uuid.adapter';
import { prismaSchoolEntityAdapter } from 'src/modules/school/adapters/prisma_school_entity.adapter';
import { RoleBindingAction } from '../types/role_binding.type';

export const prismaUserRoleEntityAdapter = (
  document: UserRole & {
    school?: School;
  },
): UserRoleEntity => {
  if (document) {
    return {
      id: uuidAdapter(document.id),
      name: document.name,
      actions: document.actions as RoleBindingAction,
      schoolID: document.school_id
        ? uuidAdapter(document.school_id)
        : undefined,
      school: document.school
        ? prismaSchoolEntityAdapter(document.school)
        : undefined,
      order: document.order,
    };
  }
};
