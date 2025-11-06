import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { User } from '../common/decorators/user.decorator'
import { Usuario } from '../usuario/usuario.entity'
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
  async getAll(@User() user: Usuario) {
    const alumnos = await this.service.getAll()
    const isAdmin = this.utils.isAdmin(user)

    if (isAdmin) {
      return plainToInstance(AlumnoResponseDto, alumnos, { groups: ['ADMIN'] })
    }
    return plainToInstance(AlumnoResponseDto, alumnos)
  }
}
