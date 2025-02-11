import { StrictOmit, StrictPick } from 'utils';
import { UserEntity } from '../entities';
import { Email, UUID } from 'src/brands';
import { IsEmail, IsEnum, IsString, IsUUID } from 'class-validator';
import { Expose } from 'class-transformer';
import { UserStatus } from '../enums';

type ResponseData = StrictOmit<
  UserEntity,
  'roles' | 'evaluations' | 'roleBindings'
>;

export class UserResponseData implements ResponseData {
  @IsEmail()
  @Expose()
  email: Email;
  @Expose()
  @IsString()
  firstname: string;
  @IsUUID(4, {
    message: 'No es un id válido',
  })
  @Expose()
  id: UUID;
  @Expose()
  @IsString()
  lastname: string;
  @Expose()
  @IsEnum(UserStatus)
  status?: UserStatus;
  pid;
}
