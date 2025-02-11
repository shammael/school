import { StrictPick } from 'utils';
import { ProgramEntity } from '../entities';
import { DynamicObject } from 'src/commons/types';
import { UUID } from 'src/brands';
import { Prisma } from '@prisma/client';

type Where = StrictPick<ProgramEntity, 'id'>;

export class DeleteProgramWhereRequest implements DynamicObject<Where> {
  id: UUID;
}

export class DeleteProgramRequest {
  where: DeleteProgramWhereRequest;
  include?: Prisma.ProgramInclude;
}
