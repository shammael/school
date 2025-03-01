import { Hash, Token, UUID } from 'src/brands';
import { MediaEntity } from 'src/modules/media/entities/media.entity';
import { UserRoleBindingEntity } from 'src/modules/user_role_binding/entities';

export class ProfileEntity {
  id: UUID;
  imageID?: UUID;
  image?: MediaEntity;
  password: Hash;
  defaultPassword: boolean;
  userRoleBindingID: UUID;
  userRoleBinding?: UserRoleBindingEntity;
  token?: Token;
}
