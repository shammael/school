import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/database/services/prisma.service';
import { GetSchoolRequest } from '../requests/get_school.request';
import { prismaSchoolEntityAdapter } from '../adapters/prisma_school_entity.adapter';

@Injectable()
export class GetSchoolService {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ where, include }: GetSchoolRequest) {
    const res = prismaSchoolEntityAdapter(
      await this.prismaService.school.findFirst({
        where: {
          ...where,
          location: where.location
            ? {
                country_state_id: where.location.countryStateID,
                municipality_id: where.location.municipalityID,
                region_id: where.location.regionID,
              }
            : undefined,
        },
        include,
      }),
    );

    return res;
  }
}
