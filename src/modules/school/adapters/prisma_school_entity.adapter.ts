import { Location, School } from '@prisma/client';
import { SchoolEntity } from '../entities/school.entity';
import { SchoolStatus, SchoolType } from '../enums';
import { uuidAdapter } from 'src/commons/adapters/uuid.adapter';
import { prismaLocationEntityAdapter } from 'src/modules/location/adapters/prisma_location_entity.adapter';

export const prismaSchoolEntityAdapter = (
  document: School & { location?: Location },
): SchoolEntity => {
  if (document) {
    return {
      createdAt: document.created_at,
      id: uuidAdapter(document.id),
      name: document.name,
      type: document.type as SchoolType,
      updatedAt: document.updated_at,
      status: document.status as SchoolStatus,
      location: document.location
        ? prismaLocationEntityAdapter(document.location)
        : undefined,
      short: document.short,
      code: document.code,
    };
  }
};
