import { UUID } from 'src/brands';
import { GossipEvent, GossipModule } from '../enums';
import { GossipUserEntity } from './gossip_user.entity';

export class GossipEntity<NewData = any, OldData = any> {
  id: UUID;
  activityID: UUID;
  module: GossipModule;
  event: GossipEvent;
  newData?: NewData;
  oldData?: OldData;
  createdAt: Date;
  updatedAt: Date;
  gossipUser?: GossipUserEntity;
}
