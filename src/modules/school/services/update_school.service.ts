import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/database/services/prisma.service';
import { UpdateSchoolRequest } from '../requests/update_school.request';
import { prismaSchoolEntityAdapter } from '../adapters/prisma_school_entity.adapter';

@Injectable()
export class UpdateSchoolService {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ data, include, where }: UpdateSchoolRequest) {
    const res = prismaSchoolEntityAdapter(
      await this.prismaService.school.update({
        data: {
          name: data.name,
          type: data.type,
        },
        where,
        include,
      }),
    );
    return res;
  }
}
