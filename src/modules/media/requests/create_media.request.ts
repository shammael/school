import { StrictPick } from 'utils';
import { MediaEntity } from '../entities/media.entity';
import { Path } from 'src/brands';

type Request = StrictPick<MediaEntity, 'filePath'>;

export class CreateMediaDataRequest implements Request {
  filePath: Path;
}
