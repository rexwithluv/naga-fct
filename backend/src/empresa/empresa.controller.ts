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
} from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { JwtPayloadDto } from '../auth/dto/jwt-payload.dto'
import { User } from '../common/decorators/user.decorator'
import { UtilsService } from '../utils/utils.service'
import { EmpresaCreateDto } from './dto/empresa-create.dto'
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

    return plainToInstance(EmpresaResponseDto, empresas, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,

      groups: this.utils.getGroups(jwtUser),
    })
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getById(@User() jwtUser: JwtPayloadDto, @Param('id', ParseIntPipe) id: number) {
    const empresa = await this.service.getById(jwtUser, id)

    return plainToInstance(EmpresaResponseDto, empresa, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,

      groups: this.utils.getGroups(jwtUser),
    })
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@User() jwtUser: JwtPayloadDto, @Body() dto: EmpresaCreateDto) {
    const empresa = this.service.create(jwtUser, dto)

    return plainToInstance(EmpresaResponseDto, empresa, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,

      groups: this.utils.getGroups(jwtUser),
    })
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@User() jwtUser: JwtPayloadDto, @Param('id', ParseIntPipe) id: number) {
    const empresa = await this.service.delete(jwtUser, id)

    return plainToInstance(EmpresaResponseDto, empresa, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,

      groups: this.utils.getGroups(jwtUser),
    })
  }
}
