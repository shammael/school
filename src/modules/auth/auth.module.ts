import { Module } from '@nestjs/common';
import { HashModule } from '../hash/hash.module';
import { CypherModule } from '../cypher/cypher.module';
import { LoginController } from './controllers/login.controller';
import { UserRoleBindingModule } from '../user_role_binding/user_role_binding.module';
import { GossipModule } from '../gossip/gossip.module';
import { LoginAdminController } from './controllers/login_admin.controller';
import { UserModule } from '../user/user.module';
import { ProfileModule } from '../profile/profile.module';
import { AuthenticationGuard } from './guards';

@Module({
  imports: [
    HashModule,
    CypherModule,
    UserRoleBindingModule,
    GossipModule,
    UserModule,
    ProfileModule,
  ],
  controllers: [LoginController, LoginAdminController],
  providers: [AuthenticationGuard],
  exports: [AuthenticationGuard],
})
export class AuthModule {}
