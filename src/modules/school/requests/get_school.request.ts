import { StrictPick } from 'utils';
import { SchoolEntity } from '../entities/school.entity';
import { UUID } from 'src/brands';
import { Prisma } from '@prisma/client';
import { SchoolStatus } from '../enums';
import { GetLocationDataRequest } from 'src/modules/location/requests';
import {
  EnumOptions,
  StringOptions,
  UUIDOptions,
} from 'src/commons/interfaces/request_options.interface';

type Request = Partial<
  StrictPick<SchoolEntity, 'id' | 'status' | 'name' | 'code' | 'short'>
> & {
  location?: GetLocationDataRequest;
};

export class GetSchoolDataRequest
  implements Partial<Record<keyof Request, unknown>>
{
  id?: UUIDOptions | UUID;
  name?: StringOptions | string;
  status?: EnumOptions<SchoolStatus> | SchoolStatus;
  location?: GetLocationDataRequest;
  code?: StringOptions | string;
  short?: StringOptions | string;
}

export class GetSchoolRequest {
  where: GetSchoolDataRequest;
  include?: Prisma.SchoolInclude;
}
