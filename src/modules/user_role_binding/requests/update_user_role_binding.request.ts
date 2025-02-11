import { StrictOmit } from 'utils';
import { UserRoleBindingEntity } from '../entities';
import { UpdateProfileDataRequest } from 'src/modules/profile/requests';
import { UpdateUserRoleDataRequest } from 'src/modules/user_role/requests';
import { UUID } from 'src/brands';
import { Prisma } from '@prisma/client';

type Request = StrictOmit<
  UserRoleBindingEntity,
  'id' | 'createdAt' | 'updatedAt' | 'roleID' | 'userID' | 'user'
>;

type Req = {
  [k in keyof Request]: any;
};

export class UpdateUserRoleBindingDataRequest implements Req {
  profile?: UpdateProfileDataRequest;
}

export class UpdateUserRoleBindingWhereRequest {
  id: UUID;
}

export class UpdateUserRoleBindingRequest {
  data: UpdateUserRoleBindingDataRequest;
  where: UpdateUserRoleBindingWhereRequest;
  include?: Prisma.UserRoleBindingInclude;
}
