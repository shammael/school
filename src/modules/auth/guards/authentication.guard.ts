import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JsonWebTokenError } from 'jsonwebtoken';
import { UUID } from 'src/brands';
import { JwtService } from 'src/modules/jwt/services';
import { UserRoleBindingEntity } from 'src/modules/user_role_binding/entities';
import { GetUserRoleBindingService } from 'src/modules/user_role_binding/services';
import { ENV_TYPE } from 'src/schemas/zod.schema';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService<ENV_TYPE>,
    private readonly jwtService: JwtService,
    private readonly getUserRoleBindingService: GetUserRoleBindingService,
  ) {}
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req: Request & {
      userRoleBinding: UserRoleBindingEntity;
    } = ctx.switchToHttp().getRequest();
    const accessToken = req.headers['authorization'];

    if (!accessToken) {
      throw new UnauthorizedException({
        message: 'Operación no permitida',
      });
    }

    let userID: UUID;
    let userRoleBindingID: UUID;
    try {
      const decryptedAccessToken = this.jwtService.verify<{
        userID: UUID;
        userRoleBindingID: UUID;
      }>({
        secret: this.configService.get('JWT_ACCESS_TOKEN'),
        token: accessToken.split(' ')[1],
      });
      userID = decryptedAccessToken.userID;
      userRoleBindingID = decryptedAccessToken.userRoleBindingID;
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        throw new UnauthorizedException({
          message: 'Token no válido',
        });
      } else {
        throw error;
      }
    }

    const userRoleBinding = await this.getUserRoleBindingService.execute({
      where: {
        id: userRoleBindingID,
        userID,
      },
      include: {
        role: true,
        user: true,
      },
    });

    if (!userRoleBinding) {
      throw new UnauthorizedException({
        message: 'Operacion no permitida',
      });
    }

    req.userRoleBinding = userRoleBinding;

    return true;
  }
}
