import { StrictPick } from 'utils';
import { SchoolEntity } from '../entities/school.entity';
import { SchoolType } from '../enums';
import { Prisma } from '@prisma/client';

type Request = Partial<
  StrictPick<SchoolEntity, 'name' | 'type' | 'code' | 'short'>
>;
type WhereRequest = StrictPick<SchoolEntity, 'id'>;

export class UpdateSchoolDataRequest implements Request {
  name?: string;
  type: SchoolType;
  code?: string;
  short?: string;
}

export class UpdateSchoolRequest {
  data: UpdateSchoolDataRequest;
  where: WhereRequest;
  include?: Prisma.SchoolInclude;
}
