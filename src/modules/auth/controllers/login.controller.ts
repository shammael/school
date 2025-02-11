import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Res,
} from '@nestjs/common';
import { LoginDto } from '../dtos';
import { GetUserRoleBindingService } from 'src/modules/user_role_binding/services';
import { HashService } from 'src/modules/hash/services';
import { JwtService } from 'src/modules/jwt/services';
import { ENV_TYPE } from 'src/schemas/zod.schema';
import { ConfigService } from '@nestjs/config';
import { Hash, Password, Token, UUID } from 'src/brands';
import { CypherIVService } from 'src/modules/cypher/services';
import { Response } from 'express';
import { CreateGossipService } from 'src/modules/gossip/services';
import { GossipEvent, GossipModule } from 'src/modules/gossip/enums';
import { LoginClassResponse } from '../responses';
import { Serialize } from 'src/commons/interceptors';
import { entityUserResponseAdapter } from 'src/modules/user/adapters';
import { UpdateProfileService } from 'src/modules/profile/services';
import { GetUserService, UpdateUserService } from 'src/modules/user/services';
import { UserEntity } from 'src/modules/user/entities';
import { UserRoleBindingEntity } from 'src/modules/user_role_binding/entities';

@Controller('login')
export class LoginController {
  constructor(
    private readonly getUserRoleBindingService: GetUserRoleBindingService,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<ENV_TYPE>,
    private readonly cypherService: CypherIVService,
    private readonly createGossipService: CreateGossipService,
    private readonly updateUserService: UpdateUserService,
    private readonly getUserService: GetUserService,
  ) {}

  @Post()
  @Serialize(LoginClassResponse)
  async execute(
    @Body() body: LoginDto,
    @Res({
      passthrough: true,
    })
    res: Response,
  ): Promise<LoginClassResponse> {
    try {
      if (body.isAdmin && !body.pidNumber) {
        throw new BadRequestException({
          message: 'La cedula es requerida',
          field: 'pidNumber',
        });
      }

      if (!body.isAdmin && !body.userRoleBindingID) {
        throw new BadRequestException({
          message: 'El id de la combinación de usuario y rol es requerido',
          field: 'userRoleBindingID',
        });
      }

      let user: UserEntity;
      let password: Hash;
      let userRoleBinding: UserRoleBindingEntity;
      if (body.isAdmin === true) {
        user = await this.getUserService.execute({
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
                role: true,
              },
            },
            pid: true,
          },
        });

        if (!user) {
          throw new BadRequestException('Credenciales no validas');
        }
        password = user.roleBindings[0].profile.password;
        userRoleBinding = user.roleBindings[0];
      } else {
        userRoleBinding = await this.getUserRoleBindingService.execute({
          where: {
            id: body.userRoleBindingID,
          },
          include: {
            profile: true,
            user: {
              include: {
                pid: {
                  include: {
                    image: true,
                  },
                },
              },
            },
            role: true,
          },
        });

        if (!userRoleBinding) {
          throw new BadRequestException('Credenciales no validas');
        }

        user = userRoleBinding.user;

        password = userRoleBinding.profile.password;
      }

      if (!(await this.hashService.verify(password, body.password))) {
        throw new BadRequestException('Credenciales no validas');
      }

      const accessToken = this.jwtService.sign<
        { userID: UUID; userRoleBindingID: UUID },
        Token
      >({
        payload: {
          userID: user.id,
          userRoleBindingID: userRoleBinding.id,
        },
        secret: this.configService.get('JWT_ACCESS_TOKEN'),
        options: {
          expiresIn: '24h',
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

      await this.updateUserService.execute({
        data: {
          // token: refreshToken,
          roleBindings: [
            {
              data: {
                profile: {
                  token: refreshToken,
                },
              },
              where: {
                id: userRoleBinding.id,
              },
            },
          ],
        },
        where: {
          id: userRoleBinding.userID,
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
          permissions: userRoleBinding.role.actions,
        },
      };
    } catch (error) {
      throw error;
    }
  }
}
