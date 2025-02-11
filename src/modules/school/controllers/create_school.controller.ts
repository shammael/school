import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { CreateSchoolDto } from '../dtos/create_school.dto';
import {
  CreateSchoolService,
  DeleteSchoolService,
  GetSchoolService,
} from '../services';
import { GetMunicipalityService } from 'src/modules/municipality/services';
import { SchoolEntity } from '../entities/school.entity';
import { CountSchoolService } from '../services/count_school.service';

@Controller()
export class CreateSchoolController {
  constructor(
    private readonly getSchoolService: GetSchoolService,
    private readonly createSchoolService: CreateSchoolService,
    private readonly deleteSchoolService: DeleteSchoolService,
    private readonly getMunicipalityService: GetMunicipalityService,
    private readonly countSchoolService: CountSchoolService,
  ) {}

  @Post()
  async create(@Body() body: CreateSchoolDto) {
    let schoolDB: SchoolEntity;
    try {
      const municipalityDB = await this.getMunicipalityService.execute({
        where: {
          id: body.municipalityID,
        },
      });
      if (!municipalityDB) {
        throw new BadRequestException('Municipio no encontrado');
      }
      schoolDB = await this.getSchoolService.execute({
        where: {
          name: body.name,
          location: {
            municipalityID: municipalityDB.id,
          },
        },
      });
      if (schoolDB) {
        throw new BadRequestException(
          `La institucion con el nombre ${body.name} ya existe en el municipio ${municipalityDB.name}`,
        );
      }

      let fromSchoolDB: SchoolEntity;

      if (body.from) {
        fromSchoolDB = await this.getSchoolService.execute({
          where: {
            id: body.from,
          },
        });
        if (!fromSchoolDB) {
          throw new BadRequestException(
            `La institucion con el id ${body.from} no existe`,
          );
        }
      }

      const short = fromSchoolDB ? fromSchoolDB.short : body.short;

      const count = await this.countSchoolService.execute({
        data: {
          short,
        },
      });
      schoolDB = await this.createSchoolService.execute({
        data: {
          name: body.name,
          type: body.type,
          municipalityID: municipalityDB.id,
          countryStateID: municipalityDB.countryStateID,
          regionID: municipalityDB.regionID,
          code: `${body.short}-${count + 1}`,
          short,
        },
      });
      return schoolDB;
    } catch (error) {
      if (schoolDB) {
        await this.deleteSchoolService.execute({
          where: {
            id: schoolDB.id,
          },
        });
      }
      throw error;
    }
  }
}
