import { StrictOmit, StrictPick } from 'utils';
import { GossipEntity, GossipUserEntity } from '../entities';
import { UUID } from 'src/brands';
import { GossipModule, GossipEvent } from '../enums';
import { Prisma } from '@prisma/client';

type RequestUser = StrictPick<
  GossipUserEntity,
  'email' | 'firstname' | 'lastname' | 'userID' | 'pidID' | 'pidNumber'
>;

type Request = StrictOmit<
  GossipEntity,
  'id' | 'createdAt' | 'updatedAt' | 'gossipUser'
> & {
  gossipUser: RequestUser;
};

export class CreateGossipDataRequest<NewData = any, OldData = any>
  implements Request
{
  activityID: UUID;
  module: GossipModule;
  event: GossipEvent;
  newData?: NewData;
  oldData?: OldData;
  gossipUser: RequestUser;
}

export class CreateGossipRequest<NewData = any, OldData = any> {
  data: CreateGossipDataRequest<NewData, OldData>;
  include?: Prisma.GossipInclude;
}
