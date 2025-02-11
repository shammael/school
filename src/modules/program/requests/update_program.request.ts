import { StrictOmit, StrictPick } from 'utils';
import { ProgramEntity } from '../entities';
import { DynamicObject } from 'src/commons/types';
import { UUID } from 'src/brands';
import { ProgramStatus } from '../enums';
import { Prisma } from '@prisma/client';

type Request = Partial<
  StrictOmit<ProgramEntity, 'id' | 'createdAt' | 'updatedAt' | 'evaluations'>
>;

export class UpdateProgramDataRequest implements DynamicObject<Request> {
  name?: string;
  schoolID?: UUID;
  status?: ProgramStatus;
}

type Where = StrictPick<ProgramEntity, 'id'>;

export class UpdateProgramRequest {
  data: UpdateProgramDataRequest;
  where: Where;
  include?: Prisma.ProgramInclude;
}
