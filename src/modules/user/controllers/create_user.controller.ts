import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import {
  CreateUserService,
  DeleteUserService,
  GetUserService,
} from '../services';
import { CreateUserDto } from '../dtos';
import { UserEntity } from '../entities';

@Controller('user')
export class CreateUserController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly getUserService: GetUserService,
    private readonly deleteUserService: DeleteUserService,
  ) {}

  @Post()
  async create(@Body() body: CreateUserDto) {
    let user: UserEntity;
    try {
      user = await this.getUserService.execute({
        where: {
          email: body.email,
        },
      });
      if (user) {
        throw new BadRequestException({
          message: 'Este email ya está registrado',
        });
      }
      user = await this.getUserService.execute({
        where: {
          pid: {
            number: body.pid.number,
          },
        },
      });
      if (user) {
        throw new BadRequestException({
          message: 'Este número de cédula ya está registrado',
        });
      }
      user = await this.createUserService.execute({
        data: {
          email: body.email,
          firstname: body.firstname,
          lastname: body.lastname,
          pid: {
            number: body.pid.number,
          },
        },
      });

      return user;
    } catch (error) {
      if (user) {
        await this.deleteUserService.execute({
          where: {
            id: user.id,
          },
        });
      }
      throw error;
    }
  }
}
