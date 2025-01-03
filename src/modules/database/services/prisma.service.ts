import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { ENV_TYPE } from 'src/schemas/zod.schema';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(private readonly configService: ConfigService<ENV_TYPE>) {
    super({
      datasources: {
        db: {
          url: configService.get('DATABASE_URL'),
        },
      },
    });
  }
  async onModuleDestroy() {
    await this.$disconnect();
  }
  async onModuleInit() {
    try {
      await this.$connect();
      // Raw.forEach(async (el) => {
      //   await this.$runCommandRaw(el);
      // });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error({ error });
    }
  }
}
