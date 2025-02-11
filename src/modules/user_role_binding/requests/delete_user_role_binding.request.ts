import { StrictPick } from 'utils';
import { UserRoleBindingEntity } from '../entities';
import { UUID } from 'src/brands';
import { Prisma } from '@prisma/client';

type Request = Partial<StrictPick<UserRoleBindingEntity, 'id'>>;

export class DeleteUserRoleBindingWhereRequest implements Request {
  id: UUID;
}

export class DeleteUserRoleBindingRequest {
  where: DeleteUserRoleBindingWhereRequest;
  include?: Prisma.UserRoleBindingInclude;
}
