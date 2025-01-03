import { StrictPick } from 'utils';
import { UserRoleEntity } from '../entities';
import {
  IsInt,
  IsNumber,
  IsObject,
  IsPositive,
  IsString,
} from 'class-validator';
import { RoleBindingAction } from '../types/role_binding.type';

type Dto = StrictPick<UserRoleEntity, 'name' | 'roleBindings' | 'order'>;

export class CreateUserRoleDto implements Dto {
  @IsString()
  name: string;
  @IsObject()
  roleBindings: RoleBindingAction;
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
  })
  @IsPositive()
  @IsInt()
  order: number;
}
