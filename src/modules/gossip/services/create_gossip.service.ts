import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/database/services/prisma.service';
import { CreateGossipRequest } from '../requests';
import { GossipEntity } from '../entities';
import { prismaGossipEntityAdapter } from '../adapters';
import { JsonValue } from '@prisma/client/runtime/library';

@Injectable()
export class CreateGossipService {
  constructor(private readonly prismaService: PrismaService) {}

  async execute<NewData = any, OldData = any>({
    data,
    include,
  }: CreateGossipRequest<NewData, OldData>): Promise<
    GossipEntity<NewData, OldData>
  > {
    const resp = prismaGossipEntityAdapter(
      await this.prismaService.gossip.create({
        data: {
          activity_id: data.activityID,
          module: data.module,
          event: data.event,
          new_data: data.newData as JsonValue,
          old_data: data.oldData as JsonValue,
          gossip_user: {
            create: {
              email: data.gossipUser.email,
              firstname: data.gossipUser.firstname,
              lastname: data.gossipUser.lastname,
              user_id: data.gossipUser.userID,
              pid_id: data.gossipUser.pidID,
              pid_number: data.gossipUser.pidNumber,
            },
          },
        },
        include,
      }),
    );

    return resp;
  }
}
