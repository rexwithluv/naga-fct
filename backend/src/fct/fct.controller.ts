import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common'
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
    const fct = await this.service.getAll(jwtUser)

    return plainToInstance(FctResponseDto, fct, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,

      groups: this.utils.getGroups(jwtUser),
    })
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getById(@User() jwtUser: JwtPayloadDto, @Param('id') id: string) {
    const fct = await this.service.getById(jwtUser, id)

    return plainToInstance(FctResponseDto, fct, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,

      groups: this.utils.getGroups(jwtUser),
    })
  }
}
