import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/database/services/prisma.service';
import { GetUserRoleBindingRequest } from '../requests';
import { prismaUserRoleBindingEntityAdapter } from '../adapters/prisma_user_role_binding_entity.adapter';

@Injectable()
export class GetUserRoleBindingService {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ where, include }: GetUserRoleBindingRequest) {
    const resp = prismaUserRoleBindingEntityAdapter(
      await this.prismaService.userRoleBinding.findFirst({
        where: {
          id: where.id,
          user_id: where.userID,
          role_id: where.roleID,
          profile: {
            default_password: where.profile?.defaultPassword,
            password: where.profile?.password,
          },
        },
        include,
      }),
    );

    return resp;
  }
}
