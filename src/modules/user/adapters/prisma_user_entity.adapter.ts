import {
  Evaluation,
  Pid,
  User,
  UserEvaluation,
  UserRole,
  UserRoleBinding,
} from '@prisma/client';
import { UserEntity } from '../entities/user.entity';
import { emailAdapter, uuidAdapter } from 'src/commons/adapters';
import { prismaPidEntityAdapter } from 'src/modules/pid/adapters/prisma_pid_entity.adapter';
import { prismaEvaluationEntityAdapter } from 'src/modules/evaluation/adapters/prisma_evaluation_entity.adapter';
import { prismaUserRoleEntityAdapter } from 'src/modules/user_role/adapters/prisma_user_role_entity.adapter';
import { prismaUserRoleBindingEntityAdapter } from 'src/modules/user_role_binding/adapters/prisma_user_role_binding_entity.adapter';
import { prismaUserEvaluationEntityAdapter } from 'src/modules/user_evaluation/adapters';
import { UserStatus } from '../enums';

export const prismaUserEntityAdapter = (
  document: User & {
    pid?: Pid;
    evaluations?: UserEvaluation[];
    roles?: UserRole[];
    role_bindings?: UserRoleBinding[];
  },
): UserEntity => {
  if (document) {
    return {
      id: uuidAdapter(document.id),
      firstname: document.firstname,
      lastname: document.lastname,
      email: emailAdapter(document.email),
      pid: document.pid ? prismaPidEntityAdapter(document.pid) : undefined,
      evaluations: document.evaluations
        ? document.evaluations.map((evaluation) =>
            prismaUserEvaluationEntityAdapter(evaluation),
          )
        : undefined,
      roles: document.roles
        ? document.roles.map((role) => prismaUserRoleEntityAdapter(role))
        : undefined,
      roleBindings: document.role_bindings
        ? document.role_bindings.map((role_binding) =>
            prismaUserRoleBindingEntityAdapter(role_binding),
          )
        : undefined,
      status: document.status as UserStatus,
    };
  }
};
