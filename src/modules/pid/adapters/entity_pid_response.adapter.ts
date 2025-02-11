import { entityUserResponseAdapter } from 'src/modules/user/adapters';
import { PidEntity } from '../entities/pid.entity';
import { PidResponseData } from '../responses';

export const entityPidResponseAdapter = (
  entity: PidEntity,
): PidResponseData => {
  if (entity) {
    return {
      id: entity.id,
      number: entity.number,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      userID: entity.userID,
      user: entity.user ? entityUserResponseAdapter(entity.user) : undefined,
      image: entity.image && entity.image.filePath,
    };
  }
};
