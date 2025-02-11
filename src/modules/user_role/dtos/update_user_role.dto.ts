import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { UserRoleEntity } from '../entities';
import { StrictOmit } from 'utils';
import { Module } from 'src/commons/enums/module.enum';
import { BindingActions } from 'src/configs/binding_actions.config';
import { DynamicObject } from 'src/commons/types';

type Dto = Partial<StrictOmit<UserRoleEntity, 'id' | 'schoolID' | 'school'>>;

// type Req = {
//   [k in keyof Dto]: any;
// };

export class UpdateUserRoleDto implements DynamicObject<Dto> {
  @IsString()
  @IsOptional()
  name?: string;
  @IsNumber()
  @IsOptional()
  order?: number;
  @IsObject()
  @IsOptional()
  actions?: Record<Module, Record<BindingActions, boolean>>;
}
