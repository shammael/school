import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/database/services/prisma.service';
import { prismaUserEntityAdapter } from '../adapters';
import { UpdateUserRequest } from '../requests/update_user.request';

@Injectable()
export class UpdateUserService {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ data, include, where }: UpdateUserRequest) {
    const resp = prismaUserEntityAdapter(
      await this.prismaService.user.update({
        data: {
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          pid: data.pid
            ? {
                update: {
                  number: data.pid.number,
                  image: {
                    update: {
                      file_path: data.pid.image?.filePath,
                    },
                  },
                },
              }
            : undefined,
          status: data.status,
        },
        where: {
          id: where.id,
        },
        include,
      }),
    );

    if (data.roleBindings) {
      for (const roleBinding of data.roleBindings) {
        await this.prismaService.userRoleBinding.update({
          where: {
            id: roleBinding.where.id,
          },
          data: {
            profile: roleBinding.data.profile
              ? {
                  update: {
                    password: roleBinding.data.profile?.password,
                    default_password: roleBinding.data.profile?.defaultPassword,
                    token: roleBinding.data.profile?.token,
                  },
                }
              : undefined,
          },
        });
      }
    }

    return resp;
  }
}
