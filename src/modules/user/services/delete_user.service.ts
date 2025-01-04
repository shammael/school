import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/database/services/prisma.service';
import { DeleteUserRequest } from '../requests';
import { prismaUserEntityAdapter } from '../adapters/prisma_user_entity.adapter';

@Injectable()
export class DeleteUserService {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ where, include }: DeleteUserRequest) {
    const resp = prismaUserEntityAdapter(
      await this.prismaService.user.delete({
        where: {
          id: where.id,
        },
        include,
      }),
    );

    return resp;
  }
}
