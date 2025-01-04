import { StrictPick } from 'utils';
import { UserEntity } from '../entities';
import { CreatePidDto } from 'src/modules/pid/dtos';
import { Email } from 'src/brands';
import { IsEmail, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

type Dto = StrictPick<UserEntity, 'firstname' | 'lastname' | 'email'> & {
  pid: CreatePidDto;
};

export class CreateUserDto implements Dto {
  @IsString()
  firstname: string;
  @IsString()
  lastname: string;
  @IsEmail()
  email: Email;
  @ValidateNested()
  @Type(() => CreatePidDto)
  pid: CreatePidDto;
}
