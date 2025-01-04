import { Classroom, Evaluation, School, Subject } from '@prisma/client';
import { ClassroomEntity } from '../entities/classroom.entity';
import { prismaSchoolEntityAdapter } from 'src/modules/school/adapters/prisma_school_entity.adapter';
import { uuidAdapter } from 'src/commons/adapters';
import { ClassroomStatus } from '../enums';
import { prismaEvaluationEntityAdapter } from 'src/modules/evaluation/adapters/prisma_evaluation_entity.adapter';
import { prismaSubjectEntityAdapter } from 'src/modules/subject/adapters/prisma_subject_entity.adapter';

export const prismaClassroomEntityAdapter = (
  document: Classroom & {
    subjects?: Subject[];
    school?: School;
    evaluations?: Evaluation[];
  },
): ClassroomEntity => {
  return {
    grade: document.grade,
    name: document.name,
    schoolID: uuidAdapter(document.school_id),
    school: document.school
      ? prismaSchoolEntityAdapter(document.school)
      : undefined,
    status: document.status as ClassroomStatus,
    id: uuidAdapter(document.id),
    year: document.year,
    evaluations: document.evaluations
      ? document.evaluations.map((evaluation) =>
          prismaEvaluationEntityAdapter(evaluation),
        )
      : undefined,
    subjects: document.subjects
      ? document.subjects.map((subject) => prismaSubjectEntityAdapter(subject))
      : undefined,
  };
};
