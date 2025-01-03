import { StrictPick } from 'utils';
import { UserRoleEntity } from '../entities';
import { UUID } from 'src/brands';
import { Prisma } from '@prisma/client';

type Request = Partial<StrictPick<UserRoleEntity, 'id'>>;

export class DeleteUserRoleWhereRequest implements Request {
  id: UUID;
}

export class DeleteUserRoleRequest {
  where: DeleteUserRoleWhereRequest;
  include?: Prisma.UserRoleInclude;
}
