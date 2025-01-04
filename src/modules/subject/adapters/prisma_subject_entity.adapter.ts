import {
  Classroom,
  Evaluation,
  Program,
  School,
  Subject,
} from '@prisma/client';
import { SubjectEntity } from '../entities';
import { uuidAdapter } from 'src/commons/adapters';
import { ClassroomEntity } from 'src/modules/classroom/entities';
import { prismaClassroomEntityAdapter } from 'src/modules/classroom/adapters/prisma_classroom_entity.adapter';
import { prismaSchoolEntityAdapter } from 'src/modules/school/adapters/prisma_school_entity.adapter';
import { prismaEvaluationEntityAdapter } from 'src/modules/evaluation/adapters/prisma_evaluation_entity.adapter';
import { prismaProgramEntityAdapter } from 'src/modules/program/adapters/prisma_program_entity.adapter';

export const prismaSubjectEntityAdapter = (
  document: Subject & {
    classrooms?: Classroom[];
    school?: School;
    evaluations?: Evaluation[];
    programs?: Program[];
  },
): SubjectEntity => {
  if (document) {
    return {
      id: uuidAdapter(document.id),
      name: document.name,
      classrooms: document.classrooms
        ? document.classrooms.map((classroom) =>
            prismaClassroomEntityAdapter(classroom),
          )
        : undefined,
      schoolID: uuidAdapter(document.school_id),
      school: document.school
        ? prismaSchoolEntityAdapter(document.school)
        : undefined,
      evaluations: document.evaluations
        ? document.evaluations.map((evaluation) =>
            prismaEvaluationEntityAdapter(evaluation),
          )
        : undefined,
      programs: document.programs
        ? document.programs.map((program) =>
            prismaProgramEntityAdapter(program),
          )
        : undefined,
    };
  }
};
