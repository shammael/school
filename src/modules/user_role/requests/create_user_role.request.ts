import { StrictPick } from 'utils';
import { UserRoleEntity } from '../entities';
import { UUID } from 'src/brands';
import { Prisma } from '@prisma/client';
import { RoleBindingAction } from '../types/role_binding.type';

type Request = StrictPick<
  UserRoleEntity,
  'name' | 'schoolID' | 'roleBindings' | 'order'
>;

export class CreateUserRoleDataRequest implements Request {
  name: string;
  schoolID: UUID;
  roleBindings: RoleBindingAction;
  order: number;
}

export class CreateUserRoleRequest {
  data: CreateUserRoleDataRequest;
  include?: Prisma.UserRoleInclude;
}
