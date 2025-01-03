import { CountryState, Location, Municipality } from '@prisma/client';
import { CountryStateEntity } from '../entities';
import { uuidAdapter } from 'src/commons/adapters/uuid.adapter';
import { prismaLocationEntityAdapter } from 'src/modules/location/adapters/prisma_location_entity.adapter';
import { prismaMunicipalityEntityAdapter } from 'src/modules/municipality/adapters/prisma_municipality_entity.adapter';

export const prismaCountryStateAdapter = (
  document: CountryState & {
    locations?: Location[];
    municipalities?: Municipality[];
  },
): CountryStateEntity => {
  if (document) {
    return {
      createdAt: document.created_at,
      id: uuidAdapter(document.id),
      name: document.name,
      updatedAt: document.updated_at,
      locations: document.locations.map((location) =>
        prismaLocationEntityAdapter(location),
      ),
      // municipalities,
      municipalities: document.municipalities
        ? document.municipalities.map((municipality) =>
            prismaMunicipalityEntityAdapter(municipality),
          )
        : undefined,
    };
  }
};
