import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { EstadoAlumnoResponseDto } from './dto/estado-alumno-response.dto'
import { EstadoAlumnoService } from './estado-alumno.service'

@Controller('estados-alumno')
export class EstadoAlumnoController {
  constructor(private readonly service: EstadoAlumnoService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll() {
    const estadosAlumno = await this.service.getAll()

    return plainToInstance(EstadoAlumnoResponseDto, estadosAlumno)
  }
}
