import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { JwtPayloadDto } from '../auth/dto/jwt-payload.dto'
import { User } from '../common/decorators/user.decorator'
import { UtilsService } from '../utils/utils.service'
import { EmpresaResponseDto } from './dto/empresa-response.dto'
import { EmpresaService } from './empresa.service'

@Controller('empresas')
export class EmpresaController {
  constructor(
    private readonly service: EmpresaService,
    private readonly utils: UtilsService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(@User() jwtUser: JwtPayloadDto) {
    const empresas = await this.service.getAll(jwtUser)
    const groups: string[] = this.utils.isAdmin(jwtUser) ? ['admin'] : []

    return plainToInstance(EmpresaResponseDto, empresas, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,

      groups: groups,
    })
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getById(@User() jwtUser: JwtPayloadDto, id: number) {
    const empresa = await this.service.getById(jwtUser, id)
    const groups: string[] = this.utils.isAdmin(jwtUser) ? ['admin'] : []

    return plainToInstance(EmpresaResponseDto, empresa, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,

      groups: groups,
    })
  }
}
