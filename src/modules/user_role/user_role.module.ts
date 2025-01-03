import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import {
  CreateUserRoleService,
  DeleteUserRoleService,
  GetUserRoleService,
} from './services';
import { CreateUserRoleController } from './controllers/create_user_role.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [CreateUserRoleController],
  providers: [CreateUserRoleService, DeleteUserRoleService, GetUserRoleService],
})
export class UserRoleModule {}
