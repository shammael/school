import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import {
  CreateUserRoleService,
  DeleteUserRoleService,
  GetUserRoleService,
  UpdateUserRoleService,
} from './services';
import { CreateUserRoleController } from './controllers/create_user_role.controller';
import { UserModule } from '../user/user.module';
import { UpdateUserRoleController } from './controllers/update_user_role.controller';

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [CreateUserRoleController, UpdateUserRoleController],
  providers: [
    CreateUserRoleService,
    DeleteUserRoleService,
    GetUserRoleService,
    UpdateUserRoleService,
  ],
})
export class UserRoleModule {}
