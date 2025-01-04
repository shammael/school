import {
  Evaluation,
  Media,
  Pid,
  Profile,
  UserEvaluation,
} from '@prisma/client';
import { MediaEntity } from '../entities/media.entity';
import { pathAdapter, uuidAdapter } from 'src/commons/adapters';
import { prismaEvaluationEntityAdapter } from 'src/modules/evaluation/adapters/prisma_evaluation_entity.adapter';
import { prismaProfileEntityAdapter } from 'src/modules/profile/adapters';
import { prismaPidEntityAdapter } from 'src/modules/pid/adapters/prisma_pid_entity.adapter';
import { prismaUserEvaluationEntityAdapter } from 'src/modules/user_evaluation/adapters';

export const prismaMediaEntityAdapter = (
  document: Media & {
    evaluations?: Evaluation[];
    profiles?: Profile[];
    pids?: Pid[];
    user_evaluations?: UserEvaluation[];
  },
): MediaEntity => {
  if (document) {
    return {
      id: uuidAdapter(document.id),
      filePath: pathAdapter(document.file_path),
      createdAt: document.created_at,
      updatedAt: document.updated_at,
      evaluations: document.evaluations
        ? document.evaluations.map((evaluation) =>
            prismaEvaluationEntityAdapter(evaluation),
          )
        : undefined,
      profiles: document.profiles
        ? document.profiles.map((profile) =>
            prismaProfileEntityAdapter(profile),
          )
        : undefined,
      pids: document.pids
        ? document.pids.map((pid) => prismaPidEntityAdapter(pid))
        : undefined,
      // userEvaluations: document.user_evaluations
      //   ? document.user_evaluations.map((userEvaluation) =>
      //       prismaUserEvaluationEntityAdapter(userEvaluation),
      //     )
      //   : undefined,
    };
  }
};
