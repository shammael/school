import { StrictOmit, StrictPick } from 'utils';
import { ProfileEntity } from '../entities/profile.entity';
import { Prisma } from '@prisma/client';
import { Token, UUID } from 'src/brands';

type Request = Partial<
  StrictOmit<
    ProfileEntity,
    'id' | 'userRoleBinding' | 'userRoleBindingID' | 'imageID' | 'image'
  >
>;

export class UpdateProfileDataRequest
  implements Partial<Record<keyof Request, any>>
{
  image?: string;
  password?: string;
  defaultPassword?: boolean;
  token?: Token;
}

type Where = Partial<StrictPick<ProfileEntity, 'userRoleBindingID' | 'id'>>;

export class UpdateProfileWhereRequest implements Where {
  userRoleBindingID?: UUID;
  id?: UUID;
}

export class UpdateProfileRequest {
  data: UpdateProfileDataRequest;
  where: UpdateProfileWhereRequest;
  include?: Prisma.ProfileInclude;
}
