import { CountryState, Location, Municipality, Region } from '@prisma/client';
import { MunicipalityEntity } from '../entities';
import { uuidAdapter } from 'src/commons/adapters/uuid.adapter';
import { prismaLocationEntityAdapter } from 'src/modules/location/adapters/prisma_location_entity.adapter';
import { prismaCountryStateAdapter } from 'src/modules/country_state/adapters/prisma_country_state.adapter';
import { prismaRegionEntityAdapter } from 'src/modules/region/adapters/prisma_region_entity.adapter';

export const prismaMunicipalityEntityAdapter = (
  document: Municipality & {
    locations?: Location[];
    country_state?: CountryState;
    region?: Region;
  },
): MunicipalityEntity => {
  if (document) {
    return {
      createdAt: document.created_at,
      id: uuidAdapter(document.id),
      name: document.name,
      updatedAt: document.updated_at,
      locations: document.locations
        ? document.locations.map((location) =>
            prismaLocationEntityAdapter(location),
          )
        : undefined,
      countryStateID: uuidAdapter(document.country_state_id),
      countryState: document.country_state
        ? prismaCountryStateAdapter(document.country_state)
        : undefined,
      regionID: uuidAdapter(document.region_id),
      region: document.region
        ? prismaRegionEntityAdapter(document.region)
        : undefined,
    };
  }
};
