import { IsUUID } from 'class-validator';
import { UUID } from 'src/brands';

export class UpdateUserRoleParamDto {
  @IsUUID(4, {
    message: 'No es un id válido',
  })
  id: UUID;
}
