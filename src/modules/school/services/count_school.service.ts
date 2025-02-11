import { Injectable } from '@nestjs/common';
import { CountSchoolRequest } from '../requests/count_school.request';
import { PrismaService } from 'src/modules/database/services/prisma.service';

@Injectable()
export class CountSchoolService {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(request?: CountSchoolRequest) {
    const res = await this.prismaService.school.count({
      where: {
        name: request?.data.name,
        status: request?.data.status,
        type: request?.data.type,
      },
    });

    return res;
  }
}
