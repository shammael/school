import { StrictPick } from 'utils';
import { UserRoleEntity } from '../entities';
import { UUID } from 'src/brands';
import { Prisma } from '@prisma/client';

type Request = Partial<StrictPick<UserRoleEntity, 'name' | 'id' | 'schoolID'>>;

export class GetUserRoleWhereRequest implements Request {
  id?: UUID;
  name?: string;
  schoolID?: UUID;
}

export class GetUserRoleRequest {
  where: GetUserRoleWhereRequest;
  include?: Prisma.UserRoleInclude;
}
