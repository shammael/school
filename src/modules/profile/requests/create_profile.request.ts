import { StrictPick } from 'utils';
import { ProfileEntity } from '../entities/profile.entity';
import { Hash, UUID } from 'src/brands';
import { CreateMediaDataRequest } from 'src/modules/media/requests';

type Request = StrictPick<ProfileEntity, 'defaultPassword' | 'password'> & {
  image?: CreateMediaDataRequest;
  userID?: UUID;
};

export class CreateProfileDataRequest implements Request {
  defaultPassword: boolean;
  password: Hash;
  userID?: UUID;
  image?: CreateMediaDataRequest;
}
