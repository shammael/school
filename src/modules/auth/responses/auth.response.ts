import { Expose, Type } from 'class-transformer';
import { IsJWT, IsObject, ValidateNested } from 'class-validator';
import { Token } from 'src/brands';
import { UserResponseData } from 'src/modules/user/responses';

export class DataResponse {
  @ValidateNested()
  @Type(() => UserResponseData)
  @Expose()
  user: UserResponseData;
  @IsJWT()
  @Expose()
  accessToken: string;
  @IsObject()
  @Expose()
  permissions: Record<string, any>;
}

export class LoginClassResponse {
  @ValidateNested()
  @Type(() => DataResponse)
  @Expose()
  data: DataResponse;
}
