import { StrictOmit } from 'utils';
import { MediaEntity } from '../entities/media.entity';

type Request = StrictOmit<
  MediaEntity,
  'id' | 'createdAt' | 'updatedAt' | 'evaluations' | 'pids' | 'profiles'
>;

type Req = {
  [k in keyof Request]: any;
};

export class UpdateMediaDataRequest implements Partial<Req> {
  filePath?: string;
}
