//

import { StrictPick } from 'utils';
import { LocationEntity } from '../entities/location.entity';
import { UUID } from 'src/brands';

type Request = Partial<
  StrictPick<
    LocationEntity,
    'id' | 'countryStateID' | 'regionID' | 'schoolID' | 'municipalityID'
  >
>;

export class GetLocationDataRequest implements Request {
  id?: UUID;
  countryStateID?: UUID;
  regionID?: UUID;
  municipalityID?: UUID;
  schoolID?: UUID;
}
