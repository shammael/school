import { StrictOmit } from 'utils';
import { ProgramEntity } from '../entities';
import { DynamicObject } from 'src/commons/types';
import { UUID } from 'src/brands';
import { ProgramStatus } from '../enums';
import { Prisma } from '@prisma/client';

type Request = StrictOmit<
  ProgramEntity,
  'id' | 'createdAt' | 'updatedAt' | 'evaluations'
>;

export class CreateProgramDataRequest implements DynamicObject<Request> {
  schoolID: UUID;
  status: ProgramStatus;
  name: string;
}

export class CreateProgramWhereRequest {
  data: CreateProgramDataRequest;
  include?: Prisma.ProgramInclude;
}
