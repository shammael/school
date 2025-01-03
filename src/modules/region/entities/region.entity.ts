import { UUID } from 'src/brands';
import { LocationEntity } from 'src/modules/location/entities/location.entity';
import { MunicipalityEntity } from 'src/modules/municipality/entities/municipality.entity';

export class RegionEntity {
  id: UUID;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  locations: LocationEntity[];
  municipalities: MunicipalityEntity[];
}
