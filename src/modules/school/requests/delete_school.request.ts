import { StrictPick } from 'utils';
import { SchoolEntity } from '../entities/school.entity';
import { Prisma } from '@prisma/client';

type Request = StrictPick<SchoolEntity, 'id'>;

export class DeleteSchoolRequest {
  where: Request;
  include?: Prisma.SchoolInclude;
}
