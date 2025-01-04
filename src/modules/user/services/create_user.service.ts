import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/database/services/prisma.service';
import { CreateUserRequest } from '../requests';
import { prismaUserEntityAdapter } from '../adapters/prisma_user_entity.adapter';

@Injectable()
export class CreateUserService {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ data, include }: CreateUserRequest) {
    const resp = prismaUserEntityAdapter(
      await this.prismaService.user.create({
        data: {
          email: data.email,
          firstname: data.firstname,
          lastname: data.lastname,
          pid: {
            create: {
              number: data.pid.number,
              image: data.pid.image
                ? {
                    create: {
                      file_path: data.pid.image.filePath,
                    },
                  }
                : undefined,
            },
          },
          status: 'ACTIVE',
        },
        include,
      }),
    );
    return resp;
  }
}
