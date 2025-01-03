import { isUUID } from 'class-validator';
import { UUID } from 'src/brands';

export const uuidAdapter = (uuid: string): UUID => {
  // return uuid.replace(/-/g, '');
  if (isUUID(uuid)) {
    return uuid as UUID;
  }
  throw new Error('Invalid UUID');
};
