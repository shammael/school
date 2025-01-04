import { User, UserEvaluation } from '@prisma/client';
import { UserEvaluationEntity } from '../entities';
import { uuidAdapter } from 'src/commons/adapters';
import { prismaUserEntityAdapter } from 'src/modules/user/adapters/prisma_user_entity.adapter';

export const prismaUserEvaluationEntityAdapter = (
  document: UserEvaluation & {
    user?: User;
  },
): UserEvaluationEntity => {
  if (document) {
    return {
      evaluationID: uuidAdapter(document.evaluation_id),
      id: uuidAdapter(document.id),
      note: document.note,
      userID: uuidAdapter(document.user_id),
      user: document.user ? prismaUserEntityAdapter(document.user) : undefined,
    };
  }
};
