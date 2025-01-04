import { Path, UUID } from 'src/brands';
import { EvaluationEntity } from 'src/modules/evaluation/entities/evaluation.entity';
import { PidEntity } from 'src/modules/pid/entities/pid.entity';
import { ProfileEntity } from 'src/modules/profile/entities/profile.entity';

export class MediaEntity {
  id: UUID;
  filePath: Path;
  createdAt: Date;
  updatedAt: Date;
  evaluations: EvaluationEntity[];
  profiles: ProfileEntity[];
  pids: PidEntity[];
}
