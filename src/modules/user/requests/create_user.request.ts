import { StrictOmit } from 'utils';
import { UserEntity } from '../entities';
import { Email } from 'src/brands';
import { PidEntity } from 'src/modules/pid/entities/pid.entity';
import { Prisma } from '@prisma/client';
import { CreatePidDataRequest } from 'src/modules/pid/requests';

type Request = StrictOmit<
  UserEntity & {
    pid: CreatePidDataRequest;
  },
  'id' | 'evaluations' | 'roleBindings' | 'roles' | 'pid'
>;

export class CreateUserDataRequest implements Request {
  firstname: string;
  lastname: string;
  email: Email;
  pid: CreatePidDataRequest;
}

export class CreateUserRequest {
  data: CreateUserDataRequest;
  include?: Prisma.UserInclude;
}
