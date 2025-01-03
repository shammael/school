import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/database/services/prisma.service';
import { DeleteSchoolRequest } from '../requests';

@Injectable()
export class DeleteSchoolService {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ where, include }: DeleteSchoolRequest) {
    const res = await this.prismaService.school.delete({
      where,
      include,
    });

    return res;
  }
}
