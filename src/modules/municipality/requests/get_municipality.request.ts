import { StrictPick } from 'utils';
import { MunicipalityEntity } from '../entities';
import { Prisma } from '@prisma/client';

type Request = StrictPick<MunicipalityEntity, 'id'>;

export class GetMunicipalityRequest {
  where: Request;
  include?: Prisma.MunicipalityInclude;
}
