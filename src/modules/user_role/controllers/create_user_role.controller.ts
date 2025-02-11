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
    let createdUserRole: UserRoleEntity;
    try {
      const userRoleDB = await this.getUserRoleService.execute({
        where: {
          name: body.name,
          schoolID: body.schoolID,
        },
      });
      if (userRoleDB) {
        throw new BadRequestException({
          message: 'Esta institución ya tiene un rol de usuario con ese nombre',
        });
      }
      createdUserRole = await this.createUserRoleService.execute({
        data: {
          name: body.name,

          actions: body.actions,
          schoolID: body.schoolID,
          order: body.order,
        },
      });
      return createdUserRole;
    } catch (error) {
      if (createdUserRole) {
        await this.deleteUserRoleService.execute({
          where: {
            id: createdUserRole.id,
          },
        });
      }
      throw error;
    }
  }
}
