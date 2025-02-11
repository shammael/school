import { Gossip, GossipUser, Pid, User } from '@prisma/client';
import { GossipUserEntity } from '../entities/gossip_user.entity';
import { emailAdapter, uuidAdapter } from 'src/commons/adapters';
import { prismaGossipEntityAdapter } from './prisma_gossip_entity.adapter';
import { prismaPidEntityAdapter } from 'src/modules/pid/adapters/prisma_pid_entity.adapter';
import { prismaUserEntityAdapter } from 'src/modules/user/adapters/prisma_user_entity.adapter';

export const prismaGossipUserEntityAdapter = (
  document: GossipUser & { gossip?: Gossip; pid?: Pid; user?: User },
): GossipUserEntity => {
  if (document) {
    return {
      email: emailAdapter(document.email),
      firstname: document.firstname,
      lastname: document.lastname,
      id: uuidAdapter(document.id),
      pidID: uuidAdapter(document.pid_id),
      pidNumber: document.pid_number,
      userID: uuidAdapter(document.user_id),
      gossipID: uuidAdapter(document.gossip_id),
      gossip: document.gossip
        ? prismaGossipEntityAdapter(document.gossip)
        : undefined,
      pid: document.pid ? prismaPidEntityAdapter(document.pid) : undefined,
      user: document.user ? prismaUserEntityAdapter(document.user) : undefined,
    };
  }
};
