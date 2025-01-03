import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/database/services/prisma.service';
import { CreateSchoolRequest } from '../requests';
import { prismaSchoolEntityAdapter } from '../adapters/prisma_school_entity.adapter';

@Injectable()
export class CreateSchoolService {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ data, include }: CreateSchoolRequest) {
    const res = prismaSchoolEntityAdapter(
      await this.prismaService.school.create({
        data: {
          name: data.name,
          type: data.type,
          location: {
            create: {
              municipality_id: data.municipalityID,
              country_state_id: data.countryStateID,
              region_id: data.regionID,
            },
          },
          status: 'ACTIVE',
        },
        include,
      }),
    );

    return res;
  }
}
