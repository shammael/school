import { StrictPick } from 'utils';
import { SchoolEntity } from '../entities/school.entity';
import { SchoolStatus, SchoolType } from '../enums';
import { Prisma } from '@prisma/client';
import {
  EnumOptions,
  StringOptions,
} from 'src/commons/interfaces/request_options.interface';

type Request = Partial<
  StrictPick<SchoolEntity, 'name' | 'type' | 'status' | 'short' | 'code'>
>;

// export class CountSchoolDataRequest implements Request {
//   name?: string;
//   status?: SchoolStatus;
//   type?: SchoolType;
// }

export class CountSchoolDataRequest
  implements Partial<Record<keyof Request, unknown>>
{
  name?: StringOptions | string;
  status?: EnumOptions<SchoolStatus> | SchoolStatus;
  type?: EnumOptions<SchoolType> | SchoolType;
  short?: StringOptions | string;
  code?: StringOptions | string;
}

export class CountSchoolRequest {
  data: CountSchoolDataRequest;
}
