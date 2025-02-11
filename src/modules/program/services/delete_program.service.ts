import { Injectable } from '@nestjs/common';
import { DeleteProgramRequest } from '../requests';
import { prismaProgramEntityAdapter } from '../adapters/prisma_program_entity.adapter';
import { PrismaService } from 'src/modules/database/services/prisma.service';

@Injectable()
export class DeleteProgramService {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ where, include }: DeleteProgramRequest) {
    const resp = prismaProgramEntityAdapter(
      await this.prismaService.program.delete({
        where: {
          id: where.id,
        },
        include,
      }),
    );

    return resp;
  }
}
