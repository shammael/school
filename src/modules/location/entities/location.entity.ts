import { UUID } from 'src/brands';
import { CountryStateEntity } from 'src/modules/country_state/entities';
import { MunicipalityEntity } from 'src/modules/municipality/entities';
import { RegionEntity } from 'src/modules/region/entities';
import { SchoolEntity } from 'src/modules/school/entities/school.entity';

export class LocationEntity {
  id: UUID;
  createdAt: Date;
  updatedAt: Date;
  countryStateID: UUID;
  countryState?: CountryStateEntity;
  regionID: UUID;
  region?: RegionEntity;
  // schools?: SchoolEntity[];
  schoolID: UUID;
  school?: SchoolEntity;
  municipalityID: UUID;
  municipality?: MunicipalityEntity;
}

// id               String       @id @default(uuid())
//   municipality_id  String
//   municipality     Municipality @relation(fields: [municipality_id], references: [id])
//   country_state_id String
//   country_state    CountryState @relation(fields: [country_state_id], references: [id])
//   region_id        String
//   region           Region       @relation(fields: [region_id], references: [id])
//   schools          School[]
