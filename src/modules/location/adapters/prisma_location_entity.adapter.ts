import {
  CountryState,
  Location,
  Municipality,
  Region,
  School,
} from '@prisma/client';
import { LocationEntity } from '../entities/location.entity';
import { uuidAdapter } from 'src/commons/adapters/uuid.adapter';
import { prismaCountryStateAdapter } from 'src/modules/country_state/adapters/prisma_country_state.adapter';
import { prismaRegionEntityAdapter } from 'src/modules/region/adapters/prisma_region_entity.adapter';
import { prismaSchoolEntityAdapter } from 'src/modules/school/adapters/prisma_school_entity.adapter';
import { prismaMunicipalityEntityAdapter } from 'src/modules/municipality/adapters/prisma_municipality_entity.adapter';

export const prismaLocationEntityAdapter = (
  document: Location & {
    country_state?: CountryState;
    region?: Region;
    school?: School;
    municipality?: Municipality;
  },
): LocationEntity => {
  if (document) {
    return {
      createdAt: document.created_at,
      id: uuidAdapter(document.id),
      updatedAt: document.updated_at,
      countryStateID: uuidAdapter(document.country_state_id),
      countryState: document.country_state
        ? prismaCountryStateAdapter(document.country_state)
        : undefined,
      regionID: uuidAdapter(document.region_id),
      region: document.region
        ? prismaRegionEntityAdapter(document.region)
        : undefined,
      school: document.school
        ? prismaSchoolEntityAdapter(document.school)
        : undefined,
      schoolID: uuidAdapter(document.school_id),
      municipalityID: uuidAdapter(document.municipality_id),
      municipality: document.municipality
        ? prismaMunicipalityEntityAdapter(document.municipality)
        : undefined,
    };
  }
};
