import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { JwtPayloadDto } from '../auth/dto/jwt-payload.dto'
import { User } from '../common/decorators/user.decorator'
import { UtilsService } from '../utils/utils.service'
import { AlumnoService } from './alumno.service'
import { AlumnoResponseDto } from './dto/alumno-response.dto'

@Controller('alumnos')
export class AlumnoController {
  constructor(
    private readonly service: AlumnoService,
    private readonly utils: UtilsService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(@User() jwtUser: JwtPayloadDto) {
    const alumnos = await this.service.getAll(jwtUser)

    return plainToInstance(AlumnoResponseDto, alumnos, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,

      groups: this.utils.getGroups(jwtUser),
    })
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getById(@User() jwtUser: JwtPayloadDto, @Param('id') id: string) {
    const alumno = await this.service.getById(jwtUser, id)

    return plainToInstance(AlumnoResponseDto, alumno, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,

      groups: this.utils.getGroups(jwtUser),
    })
  }
}
