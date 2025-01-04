import { StrictPick } from 'utils';
import { UserEntity } from '../entities';
import { UUID } from 'src/brands';
import { Prisma } from '@prisma/client';

type Request = StrictPick<UserEntity, 'id'>;

export class DeleteUserWhereRequest implements Request {
  id: UUID;
}

export class DeleteUserRequest {
  where: DeleteUserWhereRequest;
  include?: Prisma.UserInclude;
}
