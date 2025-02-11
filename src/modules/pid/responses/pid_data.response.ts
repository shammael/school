import { UUID, Pid, Path } from 'src/brands';
import { MediaEntity } from 'src/modules/media/entities/media.entity';
import { PidEntity } from '../entities/pid.entity';
import {
  IsDate,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  ValidateNested,
} from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { REGEX_MATCHER, StrictOmit } from 'utils';
import { UserResponseData } from 'src/modules/user/responses';

type ResponseData = StrictOmit<PidEntity, 'user' | 'image' | 'imageID'> & {
  user?: UserResponseData;
  image?: Path;
};

export class PidResponseData implements ResponseData {
  @IsUUID(4, {
    message: 'No es un id válido',
  })
  @Expose()
  id: UUID;
  @Matches(REGEX_MATCHER.PID)
  @Expose()
  number: Pid;
  @Expose()
  @IsDate()
  createdAt: Date;
  @Expose()
  @IsDate()
  updatedAt: Date;
  @Expose()
  @IsUUID(4, {
    message: 'No es un id válido',
  })
  userID: UUID;
  @Expose()
  @ValidateNested()
  @Type(() => UserResponseData)
  @IsOptional()
  user?: UserResponseData;
  @Expose()
  @IsString()
  image?: Path;
}
