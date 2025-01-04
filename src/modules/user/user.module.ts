import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CreateUserController } from './controllers';
import {
  CreateUserService,
  DeleteUserService,
  GetUserService,
} from './services';

@Module({
  imports: [DatabaseModule],
  controllers: [CreateUserController],
  providers: [CreateUserService, DeleteUserService, GetUserService],
})
export class UserModule {}
