import { Matches } from 'class-validator';
import { Password, Pid } from 'src/brands';
import { REGEX_MATCHER } from 'utils';

export class LoginAdminDto {
  @Matches(REGEX_MATCHER.PID)
  pidNumber: Pid;
  @Matches(REGEX_MATCHER.PASSWORD)
  password: Password;
}
