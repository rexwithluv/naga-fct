import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { JwtPayloadDto } from '../auth/dto/jwt-payload.dto'
import { User } from '../common/decorators/user.decorator'
import { UtilsService } from '../utils/utils.service'
import { AlumnoService } from './alumno.service'
import { AlumnoCreateDto } from './dto/alumno-create.dto'
import { AlumnoResponseDto } from './dto/alumno-response.dto'
import { AlumnoUpdateDto } from './dto/alumno-update.dto'

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
  async getById(@User() jwtUser: JwtPayloadDto, @Param('id', ParseIntPipe) id: number) {
    const alumno = await this.service.getById(jwtUser, id)

    return plainToInstance(AlumnoResponseDto, alumno, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,

      groups: this.utils.getGroups(jwtUser),
    })
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @User() jwtUser: JwtPayloadDto,
    @Body()
    dto: AlumnoCreateDto,
  ) {
    const alumno = await this.service.create(jwtUser, dto)

    return plainToInstance(AlumnoResponseDto, alumno, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,

      groups: this.utils.getGroups(jwtUser),
    })
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  async update(
    @User() jwtUser: JwtPayloadDto,
    @Param('id', ParseIntPipe) id: number,
    @Body()
    dto: AlumnoUpdateDto,
  ) {
    const alumno = await this.service.update(jwtUser, id, dto)

    return plainToInstance(AlumnoResponseDto, alumno, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,

      groups: this.utils.getGroups(jwtUser),
    })
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@User() jwtUser: JwtPayloadDto, @Param('id', ParseIntPipe) id: number) {
    const alumno = await this.service.delete(jwtUser, id)

    return plainToInstance(AlumnoResponseDto, alumno, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,

      groups: this.utils.getGroups(jwtUser),
    })
  }
}
