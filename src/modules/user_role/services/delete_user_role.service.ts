import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/database/services/prisma.service';
import { DeleteUserRoleRequest } from '../requests';
import { prismaUserRoleEntityAdapter } from '../adapters/prisma_user_role_entity.adapter';

@Injectable()
export class DeleteUserRoleService {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ where, include }: DeleteUserRoleRequest) {
    const resp = prismaUserRoleEntityAdapter(
      await this.prismaService.userRole.delete({
        where: {
          id: where.id,
        },
        include,
      }),
    );

    return resp;
  }
}
