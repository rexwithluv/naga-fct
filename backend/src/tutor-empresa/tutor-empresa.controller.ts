import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { TutorEmpresaResponseDto } from './dto/tutor-empresa-response.dto'
import { TutorEmpresaService } from './tutor-empresa.service'

@Controller('tutores-empresa')
export class TutorEmpresaController {
  constructor(private readonly service: TutorEmpresaService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll() {
    const tutoresEmpresa = await this.service.getAll()

    return plainToInstance(TutorEmpresaResponseDto, tutoresEmpresa, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    })
  }
}
