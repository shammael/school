import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CreateUserController } from './controllers';
import {
  CreateUserService,
  DeleteUserService,
  GetUserService,
  UpdateUserService,
} from './services';
import { GossipModule } from '../gossip/gossip.module';

@Module({
  imports: [DatabaseModule, GossipModule],
  controllers: [CreateUserController],
  providers: [
    CreateUserService,
    DeleteUserService,
    GetUserService,
    UpdateUserService,
  ],
  exports: [
    CreateUserService,
    DeleteUserService,
    GetUserService,
    UpdateUserService,
  ],
})
export class UserModule {}
