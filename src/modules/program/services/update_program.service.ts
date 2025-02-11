import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/database/services/prisma.service';
import { UpdateProgramRequest } from '../requests/update_program.request';
import { prismaProgramEntityAdapter } from '../adapters/prisma_program_entity.adapter';

@Injectable()
export class UpdateProgramService {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ data, include, where }: UpdateProgramRequest) {
    const resp = prismaProgramEntityAdapter(
      await this.prismaService.program.update({
        data: {
          name: data.name,
          school_id: data.schoolID,
          status: data.status,
        },
        where: {
          id: where.id,
        },
        include,
      }),
    );

    return resp;
  }
}
