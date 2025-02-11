import {
  IsBoolean,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  Validate,
  ValidateIf,
} from 'class-validator';
import { Password, Pid, UUID } from 'src/brands';
import { REGEX_MATCHER } from 'utils';

export class LoginDto {
  @IsUUID(4, {
    message: 'No es un id válido',
  })
  @IsOptional()
  @ValidateIf((data) => !data.isAdmin)
  userRoleBindingID?: UUID;
  @Matches(REGEX_MATCHER.PASSWORD)
  password: Password;
  @IsBoolean()
  isAdmin: boolean;
  @Matches(REGEX_MATCHER.PID)
  @ValidateIf((data) => data.isAdmin)
  pidNumber: Pid;
}
