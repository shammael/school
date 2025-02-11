import { Module } from '@nestjs/common';
import { CypherIVService } from './services';

@Module({
  providers: [CypherIVService],
  exports: [CypherIVService],
})
export class CypherModule {}
