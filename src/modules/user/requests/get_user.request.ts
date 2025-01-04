import { StrictPick } from 'utils';
import { UserEntity } from '../entities';
import { Email, UUID } from 'src/brands';
import { PidEntity } from 'src/modules/pid/entities/pid.entity';
import { GetPidWhereRequest } from 'src/modules/pid/requests';
import { Prisma } from '@prisma/client';
import { UserStatus } from '../enums';

type Request = Partial<
  StrictPick<UserEntity, 'id' | 'email' | 'firstname' | 'lastname' | 'status'>
> & {
  pid?: GetPidWhereRequest;
};

export class GetUserWhereRequest implements Request {
  email?: Email;
  id?: UUID;
  pid?: GetPidWhereRequest;
  firstname?: string;
  lastname?: string;
  status?: UserStatus;
}

export class GetUserRequest {
  where?: GetUserWhereRequest;
  include?: Prisma.UserInclude;
}
