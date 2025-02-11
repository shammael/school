import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import {
  CreateUserService,
  DeleteUserService,
  GetUserService,
} from '../services';
import { CreateUserDto } from '../dtos';
import { UserEntity } from '../entities';
import { CreateGossipService } from 'src/modules/gossip/services';
import { GossipEvent, GossipModule } from 'src/modules/gossip/enums';

@Controller('user')
export class CreateUserController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly getUserService: GetUserService,
    private readonly deleteUserService: DeleteUserService,
    private readonly createGossipService: CreateGossipService,
  ) {}

  @Post()
  async create(@Body() body: CreateUserDto) {
    let user: UserEntity;
    try {
      let userDB = await this.getUserService.execute({
        where: {
          email: body.email,
        },
      });
      if (userDB) {
        throw new BadRequestException({
          message: 'Este email ya está registrado',
        });
      }
      userDB = await this.getUserService.execute({
        where: {
          pid: {
            number: body.pid.number,
          },
        },
      });
      if (userDB) {
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
        include: {
          pid: true,
        },
      });

      await this.createGossipService.execute<UserEntity>({
        data: {
          activityID: user.id,
          module: GossipModule.USER,
          event: GossipEvent.CREATE,
          gossipUser: {
            email: body.email,
            firstname: body.firstname,
            lastname: body.lastname,
            userID: user.id,
            pidID: user.pid.id,
            pidNumber: user.pid.number,
          },
          newData: user,
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
