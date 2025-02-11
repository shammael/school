import { IsEnum, IsString, IsUUID } from 'class-validator';
import { SchoolType } from '../enums';
import { UUID } from 'src/brands';

export class CreateSchoolDto {
  @IsString()
  name: string;
  @IsEnum(SchoolType)
  type: SchoolType;
  @IsUUID(4, {
    message: 'No es un id válido',
  })
  municipalityID: UUID;
  @IsString()
  short?: string;
  @IsUUID(4, {
    message: 'No es un id válido',
  })
  from?: UUID;
}
