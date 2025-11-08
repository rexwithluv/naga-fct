import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { JwtPayloadDto } from '../auth/dto/jwt-payload.dto'
import { RolesGuard } from '../auth/guards/roles.guard'
import { Roles } from '../common/decorators/roles.decorator'
import { User } from '../common/decorators/user.decorator'
import { Rol } from '../common/enums/rol.enum'
import { UtilsService } from '../utils/utils.service'
import { UsuarioResponseDto } from './dto/usuario-response.dto'
import { UsuarioService } from './usuario.service'

@Controller('usuarios')
@UseGuards(RolesGuard)
@Roles(Rol.ADMIN)
export class UsuarioController {
  constructor(
    private readonly service: UsuarioService,
    private readonly utils: UtilsService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(@Query('hasTutorCentro') hasTutorCentro?: boolean) {
    const usuarios = await this.service.getAll(hasTutorCentro)

    return plainToInstance(UsuarioResponseDto, usuarios, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    })
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @Roles(Rol.ADMIN, Rol.STANDARD)
  async getSelfData(@User() jwtUser: JwtPayloadDto): Promise<UsuarioResponseDto> {
    const userData = await this.service.getById(jwtUser.id)

    return plainToInstance(UsuarioResponseDto, userData, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    })
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getById(@User() jwtUser: JwtPayloadDto, @Param('id', ParseIntPipe) id: number) {
    const usuario = await this.service.getById(id)

    return plainToInstance(UsuarioResponseDto, usuario, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    })
  }

  /*
  @Post()
  @Roles(Rol.ADMIN)
  @UseGuards(RolesGuard)
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createUsuario(@Body() dto: UsuarioCreateDto): Promise<UsuarioResponseDto> {
    const usuarioGuardado = await this.service.crearUsuario(dto)

    return plainToInstance(UsuarioResponseDto, usuarioGuardado, { groups: ['admin'] })
  }

  @Put(':id')
  @Roles(Rol.ADMIN)
  @UseGuards(RolesGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async put(
    @User() user: Usuario,
    @Body() dto: UsuarioCreateDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UsuarioResponseDto> {
    const usuarioActualizado = await this.service.updateUsuario(dto, id)

    return plainToInstance(UsuarioResponseDto, usuarioActualizado, { groups: ['admin'] })
  }

  @Delete(':id')
  @Roles(Rol.ADMIN)
  @UseGuards(RolesGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.service.deleteUsuario(id)
  } */
}
