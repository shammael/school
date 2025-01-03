import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/database/services/prisma.service';
import { GetUserRoleRequest } from '../requests';
import { prismaUserRoleEntityAdapter } from '../adapters/prisma_user_role_entity.adapter';

@Injectable()
export class GetUserRoleService {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ where, include }: GetUserRoleRequest) {
    const resp = prismaUserRoleEntityAdapter(
      await this.prismaService.userRole.findFirst({
        where: {
          id: where.id,
          name: where.name,
          school_id: where.schoolID,
        },
        include,
      }),
    );

    return resp;
  }
}
