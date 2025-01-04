// id            String @id @default(uuid())
//   name          String
//   role_bindings Json
//   users         User[]
//   school_id     String

import { UUID } from 'src/brands';
import { BindingActions } from 'src/configs/binding_actions.config';
import { SchoolEntity } from 'src/modules/school/entities/school.entity';
import { RoleBindingAction } from '../types/role_binding.type';

export class UserRoleEntity {
  name: string;
  id: UUID;
  actions: RoleBindingAction;
  schoolID: UUID;
  school: SchoolEntity;
  order: number;
}
