import { UserEntity } from 'src/modules/user/entities';
import { StrictPick } from 'utils';
import { PidEntity } from '../entities/pid.entity';
import { CreateMediaDataRequest } from 'src/modules/media/requests';
import { Pid } from 'src/brands';

type Request = StrictPick<PidEntity, 'number'> & {
  image?: CreateMediaDataRequest;
};

export class CreatePidDataRequest implements Request {
  number: Pid;
  image?: CreateMediaDataRequest;
}
