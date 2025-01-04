import { StrictPick } from 'utils';
import { PidEntity } from '../entities/pid.entity';
import { Pid, UUID } from 'src/brands';

type Request = Partial<StrictPick<PidEntity, 'id' | 'number'>>;

export class GetPidWhereRequest implements Request {
  id?: UUID;
  number?: Pid;
}
