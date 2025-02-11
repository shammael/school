import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/database/services/prisma.service';
import { DeleteUserRoleBindingRequest } from '../requests';
import { prismaUserRoleBindingEntityAdapter } from '../adapters/prisma_user_role_binding_entity.adapter';

@Injectable()
export class DeleteUserRoleBinding {
  constructor(private readonly prismaService: PrismaService) {}
  async execute({ where, include }: DeleteUserRoleBindingRequest) {
    const resp = prismaUserRoleBindingEntityAdapter(
      await this.prismaService.userRoleBinding.delete({
        where,
        include,
      }),
    );

    return resp;
  }
}
