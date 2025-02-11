import { Module } from '@nestjs/common';
import { CreateGossipService } from './services';
import { DatabaseModule } from '../database/database.module';

@Module({
  providers: [CreateGossipService],
  exports: [CreateGossipService],
  imports: [DatabaseModule],
})
export class GossipModule {}
