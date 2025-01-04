import {
  Classroom,
  Evaluation,
  Program,
  Subject,
  UserEvaluation,
} from '@prisma/client';
import { EvaluationEntity } from '../entities/evaluation.entity';
import { uuidAdapter } from 'src/commons/adapters';
import { prismaClassroomEntityAdapter } from 'src/modules/classroom/adapters/prisma_classroom_entity.adapter';
import { prismaSubjectEntityAdapter } from 'src/modules/subject/adapters/prisma_subject_entity.adapter';
import { prismaUserEvaluationEntityAdapter } from 'src/modules/user_evaluation/adapters';
import { prismaProgramEntityAdapter } from 'src/modules/program/adapters/prisma_program_entity.adapter';

export const prismaEvaluationEntityAdapter = (
  document: Evaluation & {
    classroom?: Classroom;
    subject?: Subject;
    user_evaluations?: UserEvaluation[];
    program?: Program;
  },
): EvaluationEntity => {
  if (document) {
    return {
      id: uuidAdapter(document.id),
      classroomID: uuidAdapter(document.classroom_id),
      classroom: document.classroom
        ? prismaClassroomEntityAdapter(document.classroom)
        : undefined,
      subjectID: uuidAdapter(document.subject_id),
      subject: document.subject
        ? prismaSubjectEntityAdapter(document.subject)
        : undefined,
      maxNote: document.max_note,
      userEvaluations: document.user_evaluations
        ? document.user_evaluations.map((user_evaluation) =>
            prismaUserEvaluationEntityAdapter(user_evaluation),
          )
        : undefined,
      programID: uuidAdapter(document.program_id),
      program: document.program
        ? prismaProgramEntityAdapter(document.program)
        : undefined,
    };
  }
};
