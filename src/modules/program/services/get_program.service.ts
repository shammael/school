import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/database/services/prisma.service';
import { GetProgramRequest } from '../requests';
import { prismaProgramEntityAdapter } from '../adapters/prisma_program_entity.adapter';

@Injectable()
export class GetProgramService {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ where, include }: GetProgramRequest) {
    const resp = prismaProgramEntityAdapter(
      await this.prismaService.program.findFirst({
        where,
        include,
      }),
    );

    return resp;
  }
}
