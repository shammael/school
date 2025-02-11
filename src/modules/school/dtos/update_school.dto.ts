import { StrictPick } from 'utils';
import { SchoolEntity } from '../entities/school.entity';
import { SchoolStatus, SchoolType } from '../enums';
import { IsEnum, IsOptional, IsString } from 'class-validator';

type Dto = Partial<StrictPick<SchoolEntity, 'name' | 'status' | 'type'>>;

export class UpdateSchoolDto implements Dto {
  @IsString()
  @IsOptional()
  name?: string;
  @IsEnum(SchoolStatus)
  @IsOptional()
  status?: SchoolStatus;
  @IsEnum(SchoolType)
  @IsOptional()
  type?: SchoolType;
  @IsString()
  @IsOptional()
  short?: string;
}
