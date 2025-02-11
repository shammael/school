import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Res,
} from '@nestjs/common';
import { GetUserService } from 'src/modules/user/services';
import { LoginAdminDto } from '../dtos';
import { HashService } from 'src/modules/hash/services';
import { JwtService } from 'src/modules/jwt/services';
import { Token, UUID } from 'src/brands';
import { ConfigService } from '@nestjs/config';
import { ENV_TYPE } from 'src/schemas/zod.schema';
import { CypherIVService } from 'src/modules/cypher/services';
import { Response } from 'express';
import { CreateGossipService } from 'src/modules/gossip/services';
import { entityUserResponseAdapter } from 'src/modules/user/adapters';
import { GossipEvent, GossipModule } from 'src/modules/gossip/enums';
import { UpdateProfileService } from 'src/modules/profile/services';

@Controller('login')
export class LoginAdminController {
  constructor(
    private readonly getUserService: GetUserService,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<ENV_TYPE>,
    private readonly cypherService: CypherIVService,
    private readonly createGossipService: CreateGossipService,
    private readonly updateProfileService: UpdateProfileService,
  ) {}

  @Post('admin')
  async handler(
    @Body() body: LoginAdminDto,
    @Res({
      passthrough: true,
    })
    res: Response,
  ) {
    const user = await this.getUserService.execute({
      where: {
        pid: {
          number: body.pidNumber,
        },
      },
      include: {
        role_bindings: {
          where: {
            role: {
              school_id: null,
            },
          },
          include: {
            profile: true,
          },
        },
      },
    });

    if (!user) {
      throw new BadRequestException('Credenciales no validas');
    }

    if (
      !(await this.hashService.verify(
        user.roleBindings[0].profile.password,
        body.password,
      ))
    ) {
      throw new BadRequestException('Credenciales no validas');
    }

    const accessToken = this.jwtService.sign<{ userID: UUID }, Token>({
      payload: {
        userID: user.id,
      },
      secret: this.configService.get('JWT_ACCESS_TOKEN'),
      options: {
        expiresIn: '15m',
      },
    });

    let refreshToken = this.jwtService.sign<{ userID: UUID }, Token>({
      payload: {
        userID: user.id,
      },
      secret: this.configService.get('JWT_REFRESH_TOKEN'),
      options: {
        expiresIn: '24h',
      },
    });

    refreshToken = this.cypherService.encrypt({
      iv: this.configService.get('CYPHER_IV_REFRESH'),
      key: this.configService.get('CYPHER_KEY_REFRESH'),
      text: refreshToken,
    });

    await this.updateProfileService.execute({
      data: {
        token: refreshToken,
      },
      where: {
        userRoleBindingID: user.roleBindings[0].id,
      },
    });

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'none',
      secure: true,
      expires: new Date(Date.now() + 150 * 24 * 60 * 60 * 1000),
    });

    await this.createGossipService.execute({
      data: {
        activityID: user.id,
        event: GossipEvent.LOGIN,
        gossipUser: {
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
          pidID: user.pid.id,
          pidNumber: user.pid.number,
          userID: user.id,
        },
        module: GossipModule.AUTH,
      },
    });

    return {
      data: {
        user: entityUserResponseAdapter(user),
        accessToken,
        permissions: user.roleBindings[0].role.actions,
      },
    };

    return true;
  }
}
