import { Injectable } from '@nestjs/common';
import { GetMunicipalityRequest } from '../requests';
import { PrismaService } from 'src/modules/database/services/prisma.service';
import { prismaMunicipalityEntityAdapter } from '../adapters/prisma_municipality_entity.adapter';

@Injectable()
export class GetMunicipalityService {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ where, include }: GetMunicipalityRequest) {
    const res = prismaMunicipalityEntityAdapter(
      await this.prismaService.municipality.findFirst({
        where,
        include,
      }),
    );

    return res;
  }
}
