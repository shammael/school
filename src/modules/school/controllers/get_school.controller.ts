import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { GetSchoolService } from '../services';
import { isUUID } from 'class-validator';
import { uuidAdapter } from 'src/commons/adapters/uuid.adapter';

@Controller('school')
export class GetSchoolController {
  constructor(private readonly getSchoolService: GetSchoolService) {}

  @Get(':id')
  async get(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('No es un id valido');
    }

    try {
      const schoolID = uuidAdapter(id);
      const schoolDB = await this.getSchoolService.execute({
        where: {
          id: schoolID,
        },
      });
      if (!schoolDB) {
        throw new NotFoundException({
          message: `No existe la institucion con id ${id}`,
        });
      }
      return schoolDB;
    } catch (error) {
      throw error;
    }
  }
}
