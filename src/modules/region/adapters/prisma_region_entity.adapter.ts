import { Location, Municipality, Region } from '@prisma/client';
import { RegionEntity } from '../entities';
import { uuidAdapter } from 'src/commons/adapters/uuid.adapter';
import { prismaLocationEntityAdapter } from 'src/modules/location/adapters/prisma_location_entity.adapter';
import { prismaMunicipalityEntityAdapter } from 'src/modules/municipality/adapters/prisma_municipality_entity.adapter';

export const prismaRegionEntityAdapter = (
  document: Region & {
    locations?: Location[];
    municipalities?: Municipality[];
  },
): RegionEntity => {
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
      municipalities: document.municipalities
        ? document.municipalities.map((municipality) =>
            prismaMunicipalityEntityAdapter(municipality),
          )
        : undefined,
    };
  }
};
