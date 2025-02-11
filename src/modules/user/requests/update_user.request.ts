import { StrictOmit, StrictPick } from 'utils';
import { UserEntity } from '../entities';
import { UpdatePidDataRequest } from 'src/modules/pid/requests';
import {
  UpdateUserRoleBindingDataRequest,
  UpdateUserRoleBindingRequest,
} from 'src/modules/user_role_binding/requests';
import { UUID } from 'src/brands';
import { Prisma } from '@prisma/client';
import { UserStatus } from '../enums';

type Request = Partial<
  StrictOmit<UserEntity, 'id' | 'evaluations' | 'roles' | 'pid'>
>;

type Req = {
  [k in keyof Request]: any;
} & {
  pid?: UpdatePidDataRequest;
};

type Where = StrictPick<UserEntity, 'id'>;

export class UpdateUserWhereRequest implements Where {
  id: UUID;
}

export class UpdateUserDataRequest implements Req {
  firstname?: string;
  lastname?: string;
  email?: string;
  status?: UserStatus;
  pid?: UpdatePidDataRequest;
  roleBindings: UpdateUserRoleBindingRequest[];
}

export class UpdateUserRequest {
  data: UpdateUserDataRequest;
  where: UpdateUserWhereRequest;
  include?: Prisma.UserInclude;
}
