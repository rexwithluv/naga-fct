import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { plainToInstance } from 'class-transformer'
import { User } from '../common/decorators/user.decorator'
import { Usuario } from '../usuario/usuario.entity'
import { SkillResponseDto } from './dto/skill-response.dto'
import { SkillService } from './skill.service'

@Controller('skills')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard('jwt'))
export class SkillController {
  constructor(private readonly service: SkillService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(@User() usuario: Usuario): Promise<SkillResponseDto[]> {
    const skills = await this.service.getAll(usuario)

    return plainToInstance(SkillResponseDto, skills, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    })
  }
}
