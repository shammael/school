import { Prisma, User, UserRole } from '@prisma/client';
import { StrictOmit, StrictPick } from 'utils';
import { UserRoleEntity } from '../entities';
import { RoleBindingAction } from '../types/role_binding.type';
import { UUID } from 'src/brands';
type Request = StrictOmit<UserRoleEntity, 'id' | 'schoolID' | 'school'>;

type Req = {
  [k in keyof Request]: any;
};

export class UpdateUserRoleDataRequest implements Partial<Req> {
  actions?: RoleBindingAction;
  name?: string;
  order?: number;
}

type Where = StrictPick<UserRoleEntity, 'id'>;

export class UpdateUserRoleWhereRequest implements Where {
  id: UUID;
}

export class UpdateUserRoleRequest {
  data: UpdateUserRoleDataRequest;
  where: UpdateUserRoleWhereRequest;
  include?: Prisma.UserRoleInclude;
}
