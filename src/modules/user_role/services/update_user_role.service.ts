import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/database/services/prisma.service';
import { UpdateUserRoleRequest } from '../requests';
import { prismaUserRoleEntityAdapter } from '../adapters/prisma_user_role_entity.adapter';

@Injectable()
export class UpdateUserRoleService {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ data, include, where }: UpdateUserRoleRequest) {
    const resp = prismaUserRoleEntityAdapter(
      await this.prismaService.userRole.update({
        data: {
          name: data.name,
          actions: data.actions,
          order: data.order,
        },
        where: {
          id: where.id,
        },
        include,
      }),
    );

    return resp;
  }
}
