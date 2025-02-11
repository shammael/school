import { StrictPick } from 'utils';
import { UserRoleBindingEntity } from '../entities';
import { CreateProfileDataRequest } from 'src/modules/profile/requests';
import { UUID } from 'src/brands';
import { Prisma } from '@prisma/client';

type Request = StrictPick<UserRoleBindingEntity, 'userID' | 'roleID'> & {
  profile: CreateProfileDataRequest;
};

export class CreateUserRoleBindingDataRequest implements Request {
  userID: UUID;
  roleID: UUID;
  profile: CreateProfileDataRequest;
}

export class CreateUserRoleBindingRequest {
  data: CreateUserRoleBindingDataRequest;
  include?: Prisma.UserRoleBindingInclude;
}
