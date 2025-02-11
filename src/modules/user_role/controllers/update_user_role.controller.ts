import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Patch,
} from '@nestjs/common';
import { GetUserRoleService, UpdateUserRoleService } from '../services';
import { UserRoleEntity } from '../entities';
import { UUID } from 'src/brands';
import { UpdateUserRoleParamDto } from '../dtos';
import { UpdateUserRoleDto } from '../dtos/update_user_role.dto';

@Controller('user-role')
export class UpdateUserRoleController {
  constructor(
    private readonly getUserRoleService: GetUserRoleService,
    private readonly updateUserRoleService: UpdateUserRoleService,
  ) {}

  @Patch(':id')
  async handler(
    @Param() params: UpdateUserRoleParamDto,
    @Body() body: UpdateUserRoleDto,
  ) {
    let updatedUserRole: UserRoleEntity;
    let userRoleDB: UserRoleEntity;
    try {
      userRoleDB = await this.getUserRoleService.execute({
        where: {
          id: params.id,
        },
      });
      if (!userRoleDB) {
        throw new BadRequestException({
          message: 'Role de usuario no encontrado',
        });
      }
      updatedUserRole = await this.updateUserRoleService.execute({
        data: {
          actions: body.actions,
          name: body.name,
          order: body.order,
        },
        where: {
          id: params.id,
        },
      });

      return updatedUserRole;
    } catch (error) {
      if (updatedUserRole) {
        await this.updateUserRoleService.execute({
          data: {
            actions: userRoleDB.actions,
            name: userRoleDB.name,
            order: userRoleDB.order,
          },
          where: {
            id: params.id,
          },
        });
      }
    }
  }
}
