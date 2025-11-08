import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { JwtPayloadDto } from '../auth/dto/jwt-payload.dto'
import { User } from '../common/decorators/user.decorator'
import { UtilsService } from '../utils/utils.service'
import { FctResponseDto } from './dto/fct-response.dto'
import { FctService } from './fct.service'

@Controller('fct')
export class FctController {
  constructor(
    private readonly service: FctService,
    private readonly utils: UtilsService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(@User() jwtUser: JwtPayloadDto) {
    const fct = await this.service.getAll()
    const groups: string[] = this.utils.isAdmin(jwtUser) ? ['admin'] : []

    return plainToInstance(FctResponseDto, fct, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,

      groups: groups,
    })
  }
}
