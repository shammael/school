import { Module } from '@nestjs/common';
import { CreateProgramController } from './controllers';
import { DatabaseModule } from '../database/database.module';
import {
  CreateProgramService,
  DeleteProgramService,
  GetProgramService,
  UpdateProgramService,
} from './services';
import { GossipModule } from '../gossip/gossip.module';
import { UserModule } from '../user/user.module';
import { UserRoleBindingModule } from '../user_role_binding/user_role_binding.module';

@Module({
  controllers: [CreateProgramController],
  imports: [DatabaseModule, GossipModule, UserModule, UserRoleBindingModule],
  providers: [
    CreateProgramService,
    UpdateProgramService,
    DeleteProgramService,
    GetProgramService,
  ],
})
export class ProgramModule {}
