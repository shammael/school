import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import {
  CreateUserRoleService,
  DeleteUserRoleService,
  GetUserRoleService,
} from '../services';
import { CreateUserRoleDto } from '../dtos';
import { UUID } from 'src/brands';
import { UserRoleEntity } from '../entities';

@Controller('user-role')
export class CreateUserRoleController {
  constructor(
    private readonly createUserRoleService: CreateUserRoleService,
    private readonly getUserRoleService: GetUserRoleService,
    private readonly deleteUserRoleService: DeleteUserRoleService,
  ) {}

  @Post()
  async create(@Body() body: CreateUserRoleDto) {
    const schoolID = '2c46da33-4987-4631-b55c-daf80f182ca1' as UUID;
    let userRoleDB: UserRoleEntity;
    try {
      userRoleDB = await this.getUserRoleService.execute({
        where: {
          name: body.name,
          schoolID,
        },
      });
      if (userRoleDB) {
        throw new BadRequestException({
          message: 'Esta institución ya tiene un rol de usuario con ese nombre',
        });
      }
      userRoleDB = await this.createUserRoleService.execute({
        data: {
          name: body.name,

          actions: body.actions,
          schoolID,
          order: body.order,
        },
      });
      return userRoleDB;
    } catch (error) {
      if (userRoleDB) {
        await this.deleteUserRoleService.execute({
          where: {
            id: userRoleDB.id,
          },
        });
      }
      throw error;
    }
  }
}
