import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { HttpAdapterHost } from '@nestjs/core';
import { exec } from 'child_process';
import { Response } from 'express';

@Catch()
export class RestExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    console.log({ exception, host });

    let ctx: HttpArgumentsHost;
    let response: Response;
    let httpStatus: HttpStatus;

    if (exception instanceof HttpException) {
      ctx = host.switchToHttp();
      response = ctx.getResponse<Response>();
      httpStatus =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
      response.removeHeader('x-powered-by');
      response.status(httpStatus).json({
        ...(exception.getResponse() as Object),
      });
    } else {
      ctx = host.switchToHttp();
      response = ctx.getResponse();
      response.json({
        message: 'Ha occurido un error',
      });
    }

    // const responseBody = {
    //   info: exception.cause
    //     ? exception.cause.info
    //     : {
    //         code: 'ERR001',
    //         message: 'Operacion no permitida',
    //       },
    //   errors: exception.cause
    //     ? exception.cause.errors
    //     : [
    //         {
    //           message: exception.message,
    //         },
    //       ],
    // };

    // console.log({ re: resp });

    // response.send(responseBody);

    // response.removeHeader('x-powered-by');
    // response.status(httpStatus).json(responseBody);
    // response.json(responseBody);
    // console.log({ res: ctx.getResponse() });
    // throw new BadRequestException(responseBody);

    // throw new Error('Method not implemented.');

    // httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
