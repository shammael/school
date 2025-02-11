import { UUID } from 'src/brands';
import { SchoolStatus, SchoolType } from '../enums';
import { LocationEntity } from 'src/modules/location/entities/location.entity';

export class SchoolEntity {
  id: UUID;
  name: string;
  type: SchoolType;
  createdAt: Date;
  updatedAt: Date;
  location?: LocationEntity;
  status: SchoolStatus;
  short: string;
  code: string;
}
