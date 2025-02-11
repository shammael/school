import { entityPidResponseAdapter } from 'src/modules/pid/adapters';
import { UserEntity } from '../entities';
import { UserResponseData } from '../responses';

export const entityUserResponseAdapter = (
  entity: UserEntity,
): UserResponseData => {
  if (entity) {
    return {
      email: entity.email,
      firstname: entity.firstname,
      id: entity.id,
      lastname: entity.lastname,
      status: entity.status,
      pid: entity.pid ? entityPidResponseAdapter(entity.pid) : undefined,
    };
  }
};
