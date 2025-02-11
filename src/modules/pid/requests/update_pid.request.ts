import { StrictOmit } from 'utils';
import { PidEntity } from '../entities/pid.entity';
import { UpdateMediaDataRequest } from 'src/modules/media/requests';

type Request = StrictOmit<
  PidEntity,
  'id' | 'createdAt' | 'updatedAt' | 'imageID' | 'user' | 'userID'
>;

type Req = {
  [k in keyof Request]: any;
} & {
  image?: UpdateMediaDataRequest;
};

export class UpdatePidDataRequest implements Req {
  number: any;
  image?: UpdateMediaDataRequest;
}
