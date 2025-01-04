import { UUID } from 'src/brands';
import { Email } from 'src/brands/email.brand';
import { EvaluationEntity } from 'src/modules/evaluation/entities/evaluation.entity';
import { PidEntity } from 'src/modules/pid/entities/pid.entity';
import { UserEvaluationEntity } from 'src/modules/user_evaluation/entities';
import { UserRoleEntity } from 'src/modules/user_role/entities';
import { UserRoleBindingEntity } from 'src/modules/user_role_binding/entities';
import { UserStatus } from '../enums';

export class UserEntity {
  id: UUID;
  firstname: string;
  lastname: string;
  email: Email;
  pid: PidEntity;
  roles: UserRoleEntity[];
  roleBindings: UserRoleBindingEntity[];
  evaluations: UserEvaluationEntity[];
  status?: UserStatus;
}
