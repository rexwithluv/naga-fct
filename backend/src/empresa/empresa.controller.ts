import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { User } from '../common/decorators/user.decorator'
import { Usuario } from '../usuario/usuario.entity'
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
  async getAll(@User() user: Usuario) {
    const empresas = await this.service.getAll(user)

    const isAdmin = this.utils.isAdmin(user)
    if (isAdmin) {
      return plainToInstance(EmpresaResponseDto, empresas, { groups: ['ADMIN'] })
    }

    return plainToInstance(EmpresaResponseDto, empresas)
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getById(@User() user: Usuario, id: number) {
    const empresa = await this.service.getById(user, id)

    return plainToInstance(EmpresaResponseDto, empresa)
  }
}
