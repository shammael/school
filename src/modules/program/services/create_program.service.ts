import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/database/services/prisma.service';
import { CreateProgramWhereRequest } from '../requests';
import { prismaProgramEntityAdapter } from '../adapters/prisma_program_entity.adapter';

@Injectable()
export class CreateProgramService {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ data, include }: CreateProgramWhereRequest) {
    const resp = prismaProgramEntityAdapter(
      await this.prismaService.program.create({
        data: {
          school_id: data.schoolID,
          status: data.status,
          name: data.name,
        },
        include,
      }),
    );

    return resp;
  }
}
