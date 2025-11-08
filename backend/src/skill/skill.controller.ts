import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { JwtPayloadDto } from '../auth/dto/jwt-payload.dto'
import { User } from '../common/decorators/user.decorator'
import { SkillResponseDto } from './dto/skill-response.dto'
import { SkillService } from './skill.service'

@Controller('skills')
export class SkillController {
  constructor(private readonly service: SkillService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(@User() jwtUser: JwtPayloadDto) {
    const skills = await this.service.getAll(jwtUser)

    return plainToInstance(SkillResponseDto, skills, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    })
  }
}
