import { StrictPick } from 'utils';
import { ProfileEntity } from '../entities/profile.entity';
import { Hash, UUID } from 'src/brands';
import { Prisma } from '@prisma/client';

type Request = Partial<
  StrictPick<ProfileEntity, 'id' | 'defaultPassword' | 'password'>
>;

export class GetProfileWhereRequest implements Request {
  id?: UUID;
  defaultPassword?: boolean;
  password?: Hash;
}

export class GetProfileRequest {
  where: GetProfileWhereRequest;
  include?: Prisma.ProfileInclude;
}
