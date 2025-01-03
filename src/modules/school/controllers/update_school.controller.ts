import {
  BadRequestException,
  Body,
  Controller,
  Patch,
  Query,
} from '@nestjs/common';
import { GetSchoolService, UpdateSchoolService } from '../services';
import { UpdateSchoolDto } from '../dtos';
import { uuidAdapter } from 'src/commons/adapters/uuid.adapter';
import { isUUID } from 'class-validator';
import { SchoolEntity } from '../entities/school.entity';

@Controller('school')
export class UpdateSchoolController {
  constructor(
    private readonly updateSchoolService: UpdateSchoolService,
    private readonly getSchoolService: GetSchoolService,
  ) {}

  @Patch(':id')
  async update(@Body() body: UpdateSchoolDto, @Query('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException({
        message: 'Invalid id',
      });
    }
    const schoolID = uuidAdapter(id);
    let schoolDB: SchoolEntity;
    try {
      schoolDB = await this.getSchoolService.execute({
        where: {
          id: schoolID,
        },
      });
      if (!schoolDB) {
        throw new BadRequestException(`No existe la institucion con id ${id}`);
      }
      const school = await this.updateSchoolService.execute({
        where: {
          id: schoolID,
        },
        data: {
          type: body.type,
          name: body.name,
        },
      });

      return school;
    } catch (error) {
      await this.updateSchoolService.execute({
        where: {
          id: schoolID,
        },
        data: {
          type: schoolDB.type,
          name: schoolDB.name,
        },
      });
      throw error;
    }
  }
}
