import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ENV_TYPE } from './schemas/zod.schema';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory: (errors) => {
        console.log({ error: JSON.stringify(errors, null, 2) });
        const result = errors.map((error) => ({
          field: error.property,
          message:
            error.constraints &&
            error.constraints[Object.keys(error.constraints)[0]],
          value: error.value && error.value,
        }));
        console.log({ result });
        return new BadRequestException({
          errors: result,
          message: 'Error de validaciones',
        });
      },
      
    }),
  );
  const configService = app.get(ConfigService<ENV_TYPE>);
  const logger = new Logger();
  await app.listen(configService.get('PORT') ?? 3000, () => {
    logger.log('Listening at port: ' + configService.get('PORT'));
  });
  // console.log('ds');
}
bootstrap();
