import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/database/services/prisma.service';
import { CreateUserRoleRequest } from '../requests';
import { prismaUserRoleEntityAdapter } from '../adapters/prisma_user_role_entity.adapter';

@Injectable()
export class CreateUserRoleService {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ data, include }: CreateUserRoleRequest) {
    const resp = prismaUserRoleEntityAdapter(
      await this.prismaService.userRole.create({
        data: {
          name: data.name,
          actions: data.actions,
          school_id: data.schoolID,
          order: data.order,
          status: 'ACTIVE',
        },
        include,
      }),
    );

    return resp;
  }
}
