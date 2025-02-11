import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import {
  CreateUserRoleBindingService,
  GetUserRoleBindingService,
} from '../services';
import { CreateUserRoleBindingDto } from '../dtos';
import { UserRoleBindingEntity } from '../entities';
import { HashService } from 'src/modules/hash/services';
import { GetUserService } from 'src/modules/user/services';

@Controller('user-role-binding')
export class CreateUserRoleBindingController {
  constructor(
    private readonly createUserRoleBindingService: CreateUserRoleBindingService,
    private readonly getUserRoleBindingService: GetUserRoleBindingService,
    private readonly deleteUserRoleBindingService: GetUserRoleBindingService,
    private readonly hashService: HashService,
    private readonly getUserService: GetUserService,
  ) {}

  @Post()
  async handler(@Body() body: CreateUserRoleBindingDto) {
    let createdUserRoleBinding: UserRoleBindingEntity;
    try {
      if (
        !(await this.getUserService.execute({ where: { id: body.userID } }))
      ) {
        throw new BadRequestException('Usuario no encontrado');
      }
      const userRoleBindingDB = await this.getUserRoleBindingService.execute({
        where: {
          userID: body.userID,
          roleID: body.roleID,
        },
      });
      if (userRoleBindingDB) {
        throw new BadRequestException(
          'Esta combinación de usuario y rol ya existe',
        );
      }
      createdUserRoleBinding = await this.createUserRoleBindingService.execute({
        data: {
          userID: body.userID,
          roleID: body.roleID,
          profile: {
            defaultPassword: true,
            password: await this.hashService.hash(body.password),
          },
        },
      });

      return createdUserRoleBinding;
    } catch (error) {
      if (createdUserRoleBinding) {
        await this.deleteUserRoleBindingService.execute({
          where: {
            id: createdUserRoleBinding.id,
          },
        });
      }
      throw error;
    }
  }
}
