import { UUID } from 'src/brands';
import { ProfileEntity } from 'src/modules/profile/entities/profile.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { UserRoleEntity } from 'src/modules/user_role/entities';

export class UserRoleBindingEntity {
  id: UUID;
  userID: UUID;
  user?: UserEntity;
  roleID: UUID;
  role?: UserRoleEntity;
  createdAt: Date;
  updatedAt: Date;
  password: string;
  profile?: ProfileEntity;
}
