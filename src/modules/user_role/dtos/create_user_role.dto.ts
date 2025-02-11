import { StrictPick } from 'utils';
import { UserRoleEntity } from '../entities';
import {
  IsInt,
  IsNumber,
  IsObject,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';
import { RoleBindingAction } from '../types/role_binding.type';
import { UUID } from 'src/brands';

type Dto = StrictPick<UserRoleEntity, 'name' | 'actions' | 'order'>;

export class CreateUserRoleDto implements Dto {
  @IsString()
  name: string;
  @IsObject()
  actions: RoleBindingAction;
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
  })
  @IsPositive()
  @IsInt()
  order: number;
  @IsOptional()
  @IsUUID(4, {
    message: 'No es un id válido',
  })
  schoolID?: UUID;
}
