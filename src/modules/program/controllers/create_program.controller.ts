import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  CreateProgramService,
  DeleteProgramService,
  GetProgramService,
} from '../services';
import { CreateGossipService } from 'src/modules/gossip/services';
import { ProgramEntity } from '../entities';
import { CreateProgramDto } from '../dtos';
import { GossipEvent, GossipModule } from 'src/modules/gossip/enums';
import { AuthenticationGuard } from 'src/commons/guards';
import { GetUserRoleBinding } from 'src/modules/auth/decorators';
import { UserRoleBindingEntity } from 'src/modules/user_role_binding/entities';

@Controller('program')
export class CreateProgramController {
  constructor(
    private readonly createProgramService: CreateProgramService,
    private readonly getProgramService: GetProgramService,
    private readonly deleteProgramService: DeleteProgramService,
    private readonly createGossipService: CreateGossipService,
  ) {}

  @UseGuards(AuthenticationGuard)
  @Post()
  async handler(
    @Body() body: CreateProgramDto,
    @GetUserRoleBinding() userRoleBinding: UserRoleBindingEntity,
  ) {
    // console.log({ userRoleBinding });
    let createdProgram: ProgramEntity;
    try {
      const programDB = await this.getProgramService.execute({
        where: {
          name: body.name,
          schoolID: body.schoolID,
        },
      });
      if (programDB) {
        throw new BadRequestException({
          message:
            'Este nombre de programa ya está registrado es esta institución',
        });
      }
      createdProgram = await this.createProgramService.execute({
        data: {
          name: body.name,
          schoolID: body.schoolID,
          status: body.status,
        },
      });

      // await this.createGossipService.execute<ProgramEntity>({
      //   data: {
      //     activityID: createdProgram.id,
      //     module: GossipModule.PROGRAM,
      //     event: GossipEvent.CREATE,
      //     newData: createdProgram,
      //   },
      // });
      return createdProgram;
    } catch (error) {
      if (createdProgram) {
        await this.deleteProgramService.execute({
          where: {
            id: createdProgram.id,
          },
        });
      }
    }
  }
}
