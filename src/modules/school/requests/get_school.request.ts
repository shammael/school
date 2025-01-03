import { StrictPick } from 'utils';
import { SchoolEntity } from '../entities/school.entity';
import { UUID } from 'src/brands';
import { Prisma } from '@prisma/client';
import { SchoolStatus } from '../enums';
import { GetLocationDataRequest } from 'src/modules/location/requests';

type Request = Partial<StrictPick<SchoolEntity, 'id' | 'status' | 'name'>> & {
  location?: GetLocationDataRequest;
};

export class GetSchoolDataRequest implements Request {
  id?: UUID;
  name?: string;
  status?: SchoolStatus;
  location?: GetLocationDataRequest;
}

export class GetSchoolRequest {
  where: GetSchoolDataRequest;
  include?: Prisma.SchoolInclude;
}
