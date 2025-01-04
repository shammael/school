import { Evaluation, Program } from '@prisma/client';
import { ProgramEntity } from '../entities/program.entity';
import { uuidAdapter } from 'src/commons/adapters';
import { ProgramStatus } from '../enums';
import { prismaEvaluationEntityAdapter } from 'src/modules/evaluation/adapters/prisma_evaluation_entity.adapter';

export const prismaProgramEntityAdapter = (
  document: Program & {
    evaluations?: Evaluation[];
  },
): ProgramEntity => {
  if (document) {
    return {
      id: uuidAdapter(document.id),
      schoolID: uuidAdapter(document.school_id),
      status: document.status as ProgramStatus,
      createdAt: document.created_at,
      updatedAt: document.updated_at,
      name: document.name,
      evaluations: document.evaluations
        ? document.evaluations.map((evaluation) =>
            prismaEvaluationEntityAdapter(evaluation),
          )
        : undefined,
    };
  }
};
