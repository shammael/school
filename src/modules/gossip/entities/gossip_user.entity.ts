import { Email, UUID } from 'src/brands';
import { PidEntity } from 'src/modules/pid/entities/pid.entity';
import { UserEntity } from 'src/modules/user/entities';
import { GossipEntity } from './gossip.entity';

export class GossipUserEntity {
  id: UUID;
  userID: UUID;
  user?: UserEntity;
  firstname: string;
  lastname: string;
  email: Email;
  pidID: UUID;
  pid?: PidEntity;
  pidNumber: string;
  gossipID: UUID;
  gossip?: GossipEntity;
}
