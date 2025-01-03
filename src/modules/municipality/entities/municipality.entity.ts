import { UUID } from 'src/brands';
import { CountryStateEntity } from 'src/modules/country_state/entities';
import { LocationEntity } from 'src/modules/location/entities/location.entity';
import { RegionEntity } from 'src/modules/region/entities';

export class MunicipalityEntity {
  id: UUID;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  locations?: LocationEntity[];
  countryStateID: UUID;
  countryState?: CountryStateEntity;
  regionID: UUID;
  region?: RegionEntity;
}
