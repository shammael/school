import { Gossip, GossipUser } from '@prisma/client';
import { GossipEntity } from '../entities';
import { uuidAdapter } from 'src/commons/adapters';
import { GossipEvent, GossipModule } from '../enums';
import { prismaGossipUserEntityAdapter } from './prisma_gossip_user.entity';

export const prismaGossipEntityAdapter = <NewData = any, OldData = any>(
  document: Gossip & { gossip_user?: GossipUser },
): GossipEntity<NewData, OldData> => {
  if (document) {
    return {
      id: uuidAdapter(document.id),
      activityID: uuidAdapter(document.activity_id),
      module: document.module as GossipModule,
      event: document.event as GossipEvent,
      newData: document.new_data as NewData,
      oldData: document.old_data as OldData,
      createdAt: document.created_at,
      updatedAt: document.updated_at,
      gossipUser: document.gossip_user
        ? prismaGossipUserEntityAdapter(document.gossip_user)
        : undefined,
    };
  }
};
