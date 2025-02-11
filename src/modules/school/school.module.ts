import { Injectable, Module } from '@nestjs/common';
import { CreateSchoolController, UpdateSchoolController } from './controllers';
import { DatabaseModule } from '../database/database.module';
import { MunicipalityModule } from '../municipality/municipality.module';
import {
  CreateSchoolService,
  DeleteSchoolService,
  GetSchoolService,
  UpdateSchoolService,
} from './services';
import { GetSchoolController } from './controllers/get_school.controller';
import { CountSchoolService } from './services/count_school.service';

@Module({
  controllers: [
    CreateSchoolController,
    GetSchoolController,
    UpdateSchoolController,
  ],
  imports: [DatabaseModule, MunicipalityModule],
  providers: [
    CreateSchoolService,
    UpdateSchoolService,
    DeleteSchoolService,
    GetSchoolService,
    CountSchoolService,
  ],
})
export class SchoolModule {}
