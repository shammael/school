import { StrictPick } from 'utils';
import { UserRoleBindingEntity } from '../entities';
import { GetProfileWhereRequest } from 'src/modules/profile/requests';
import { UUID } from 'src/brands';
import { Prisma } from '@prisma/client';

type Request = Partial<StrictPick<UserRoleBindingEntity, 'id' | 'userID'>> & {
  profile?: GetProfileWhereRequest;
};

export class GetUserRoleBindingWhereRequest implements Request {
  id?: UUID;
  userID?: UUID;
  roleID?: UUID;
  profile?: GetProfileWhereRequest;
}

export class GetUserRoleBindingRequest {
  where: GetUserRoleBindingWhereRequest;
  include?: Prisma.UserRoleBindingInclude;
}
