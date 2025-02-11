import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/database/services/prisma.service';
import { CreateUserRoleBindingRequest } from '../requests';
import { prismaUserRoleBindingEntityAdapter } from '../adapters/prisma_user_role_binding_entity.adapter';

@Injectable()
export class CreateUserRoleBindingService {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ data, include }: CreateUserRoleBindingRequest) {
    const resp = prismaUserRoleBindingEntityAdapter(
      await this.prismaService.userRoleBinding.create({
        data: {
          profile: {
            create: {
              default_password: data.profile.defaultPassword,
              password: data.profile.password,
              image: data.profile.image
                ? {
                    create: {
                      file_path: data.profile.image.filePath,
                    },
                  }
                : undefined,
            },
          },
          user_id: data.userID,
          role_id: data.roleID,
        },
        include,
      }),
    );

    return resp;
  }
}
