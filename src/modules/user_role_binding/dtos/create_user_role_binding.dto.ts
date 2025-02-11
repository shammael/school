import { IsUUID, Matches } from 'class-validator';
import { Password, UUID } from 'src/brands';
import { REGEX_MATCHER } from 'utils';

export class CreateUserRoleBindingDto {
  @IsUUID(4, {
    message: 'No es un id válido',
  })
  userID: UUID;
  @IsUUID(4, {
    message: 'No es un id válido',
  })
  roleID: UUID;
  @Matches(REGEX_MATCHER.PASSWORD)
  password: Password;
}
