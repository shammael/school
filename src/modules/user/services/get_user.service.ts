import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/database/services/prisma.service';
import { GetUserRequest } from '../requests';
import { prismaUserEntityAdapter } from '../adapters/prisma_user_entity.adapter';

@Injectable()
export class GetUserService {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ include, where }: GetUserRequest) {
    const resp = prismaUserEntityAdapter(
      await this.prismaService.user.findFirst({
        where: {
          email: where.email,
          firstname: where.firstname,
          lastname: where.lastname,
          pid: where.pid
            ? {
                number: where.pid.number,
                id: where.pid.id,
              }
            : undefined,
          status: where.status,
        },
        include,
      }),
    );

    return resp;
  }
}
