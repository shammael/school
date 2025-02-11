import { Module } from '@nestjs/common';
import { UpdateProfileService } from './services';
import { DatabaseModule } from '../database/database.module';

@Module({
  exports: [UpdateProfileService],
  providers: [UpdateProfileService],
  imports: [DatabaseModule],
})
export class ProfileModule {}
