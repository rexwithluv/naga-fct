import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { User } from '../common/decorators/user.decorator'
import { Usuario } from '../usuario/usuario.entity'
import { SkillResponseDto } from './dto/skill-response.dto'
import { SkillService } from './skill.service'

@Controller('skills')
export class SkillController {
  constructor(private readonly service: SkillService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(@User() usuario: Usuario) {
    const skills = await this.service.getAll(usuario)

    return plainToInstance(SkillResponseDto, skills)
  }
}
