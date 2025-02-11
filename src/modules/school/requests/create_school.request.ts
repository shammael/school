import { StringOptions } from 'src/commons/interfaces/request_options.interface';
import { SchoolEntity } from '../entities/school.entity';
import { Prisma } from '@prisma/client';
import { StrictPick } from 'utils';
import { SchoolType } from '../enums';
import { UUID } from 'src/brands';

type Request = StrictPick<SchoolEntity, 'name' | 'type' | 'short' | 'code'> & {
  municipalityID: UUID;
  countryStateID: UUID;
  regionID: UUID;
};

export class CreateSchoolDataRequest implements Request {
  name: string;
  municipalityID: UUID;
  countryStateID: UUID;
  regionID: UUID;
  type: SchoolType;
  code: string;
  short: string;
}

export class CreateSchoolRequest {
  data: CreateSchoolDataRequest;
  include?: Prisma.SchoolInclude;
}
