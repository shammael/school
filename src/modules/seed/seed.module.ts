import { Module } from '@nestjs/common';
import { SeedController } from './controllers/seed.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [SeedController],
  imports: [DatabaseModule],
})
export class SeedModule {}
