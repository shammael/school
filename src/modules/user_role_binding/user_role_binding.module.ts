import { Module } from '@nestjs/common';
import {
  CreateUserRoleBindingService,
  GetUserRoleBindingService,
} from './services';
import { DatabaseModule } from '../database/database.module';
import { CreateUserRoleBindingController } from './controllers';
import { HashModule } from '../hash/hash.module';
import { UserModule } from '../user/user.module';

@Module({
  providers: [GetUserRoleBindingService, CreateUserRoleBindingService],
  exports: [GetUserRoleBindingService, CreateUserRoleBindingService],
  imports: [DatabaseModule, HashModule, UserModule],
  controllers: [CreateUserRoleBindingController],
})
export class UserRoleBindingModule {}
