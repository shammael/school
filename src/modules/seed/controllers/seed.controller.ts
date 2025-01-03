import { Controller, Get } from '@nestjs/common';
import { PrismaService } from 'src/modules/database/services/prisma.service';
import { list_state } from '../../../../data/state.json';

@Controller('seed')
export class SeedController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  async seed() {
    // await this.prismaService.seed();
    for (const state of list_state) {
      let stateRes = await this.prismaService.countryState.findFirst({
        where: {
          name: state.estado,
        },
      });
      if (!stateRes) {
        stateRes = await this.prismaService.countryState.create({
          data: {
            name: state.estado,
          },
        });
      }

      for (const municipality of state.municipios) {
        let municipalityRes = await this.prismaService.municipality.findFirst({
          where: {
            name: municipality.municipio,
            country_state_id: stateRes.id,
          },
        });
        if (!municipalityRes) {
          const region_eq = {
            'Zona Central': 'Centro',
            'Los Andes': 'Los Llanos',
            'Centro Occidente': 'Occidente',
            Capital: 'Metropolitana',
            Insular: 'Metropolitana',
            Zuliana: 'Occidente',
            Guayana: 'Guayana',
            Oriente: 'Oriente',
          };
          const region = region_eq[state.region];
          let regionDB = await this.prismaService.region.findFirst({
            where: {
              name: region,
            },
          });
          if (!regionDB) {
            regionDB = await this.prismaService.region.create({
              data: {
                name: region,
              },
            });
          }
          municipalityRes = await this.prismaService.municipality.create({
            data: {
              name: municipality.municipio,
              country_state_id: stateRes.id,
              region_id: regionDB.id,
            },
          });
        }
      }
    }

    return true;
  }
}
