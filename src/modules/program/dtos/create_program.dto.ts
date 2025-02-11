import { StrictOmit } from 'utils';
import { ProgramEntity } from '../entities';
import { DynamicObject } from 'src/commons/types';
import { IsEnum, IsString, IsUUID } from 'class-validator';
import { UUID } from 'src/brands';
import { ProgramStatus } from '../enums';

type Dto = StrictOmit<
  ProgramEntity,
  'id' | 'createdAt' | 'updatedAt' | 'evaluations'
>;

export class CreateProgramDto implements DynamicObject<Dto> {
  @IsString()
  name: string;
  @IsUUID(4, {
    message: 'No es un id válido',
  })
  schoolID: UUID;
  @IsEnum(ProgramStatus)
  status: ProgramStatus;
}
