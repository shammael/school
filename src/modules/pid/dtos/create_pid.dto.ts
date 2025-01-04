import { REGEX_MATCHER, StrictPick } from 'utils';
import { PidEntity } from '../entities/pid.entity';
import { Matches } from 'class-validator';
import { Pid } from 'src/brands';

type Dto = StrictPick<PidEntity, 'number'>;

export class CreatePidDto implements Dto {
  @Matches(REGEX_MATCHER.PID)
  number: Pid;
}
