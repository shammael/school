import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { schema } from './schemas/zod.schema';
import { ConfigModule } from '@nestjs/config';
import { SchoolModule } from './modules/school/school.module';
import { SeedModule } from './modules/seed/seed.module';
import { APP_FILTER } from '@nestjs/core';
import { RestExceptionsFilter } from './exceptions/rest.exception';
import { UserRoleModule } from './modules/user_role/user_role.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (env) => schema.parse(env),
      envFilePath: './.env',
    }),
    SchoolModule,
    SeedModule,
    UserRoleModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: RestExceptionsFilter,
    },
  ],
})
export class AppModule {}
