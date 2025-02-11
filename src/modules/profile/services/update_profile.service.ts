import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/database/services/prisma.service';
import { UpdateProfileRequest } from '../requests';
import { prismaProfileEntityAdapter } from '../adapters';

@Injectable()
export class UpdateProfileService {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ data, include, where }: UpdateProfileRequest) {
    const resp = prismaProfileEntityAdapter(
      await this.prismaService.profile.update({
        data: {
          image: {
            update: {
              file_path: data.image,
            },
          },
          password: data.password,
          default_password: data.defaultPassword,
          token: data.token,
        },
        where: {
          user_role_binding_id: where.userRoleBindingID,
        },
        include,
      }),
    );

    return resp;
  }
}
