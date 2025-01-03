import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { GetMunicipalityService } from './services';

@Module({
  imports: [DatabaseModule],
  providers: [GetMunicipalityService],
  exports: [GetMunicipalityService],
})
export class MunicipalityModule {}
