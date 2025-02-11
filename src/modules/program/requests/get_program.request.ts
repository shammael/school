import { StrictOmit, StrictPick } from 'utils';
import { ProgramEntity } from '../entities';
import { DynamicObject } from 'src/commons/types';
import { UUID } from 'src/brands';
import { ProgramStatus } from '../enums';
import { Prisma } from '@prisma/client';

type Request = Partial<
  StrictPick<ProgramEntity, 'id' | 'name' | 'schoolID' | 'status'>
>;

export class GetProgramWhereRequest implements DynamicObject<Request> {
  id?: UUID;
  name?: string;
  schoolID?: UUID;
  status?: ProgramStatus;
}

export class GetProgramRequest {
  where: GetProgramWhereRequest;
  include?: Prisma.ProgramInclude;
}
