import { StrictPick } from 'utils';
import { SchoolEntity } from '../entities/school.entity';
import { SchoolType } from '../enums';
import { Prisma } from '@prisma/client';

type Request = Partial<StrictPick<SchoolEntity, 'name' | 'type'>>;
type WhereRequest = StrictPick<SchoolEntity, 'id'>;

export class UpdateSchoolDataRequest implements Request {
  name?: string;
  type: SchoolType;
}

export class UpdateSchoolRequest {
  data: UpdateSchoolDataRequest;
  where: WhereRequest;
  include?: Prisma.SchoolInclude;
}
