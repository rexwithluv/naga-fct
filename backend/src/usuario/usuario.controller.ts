import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { plainToInstance } from 'class-transformer'
import { RolesGuard } from '../auth/guards/roles.guard'
import { Roles } from '../common/decorators/roles.decorator'
import { Rol } from '../common/enums/rol.enum'
import { UsuarioResponseDto } from './dto/usuario-response.dto'
import { UsuarioService } from './usuario.service'

@Controller('usuarios')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard('jwt'))
export class UsuarioController {
  constructor(private readonly service: UsuarioService) {}

  @Get()
  @Roles(Rol.ADMIN)
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async getAll(@Query('hasTutorCentro') hasTutorCentro?: boolean): Promise<UsuarioResponseDto[]> {
    const usersData = await this.service.getAll(hasTutorCentro)

    return plainToInstance(UsuarioResponseDto, usersData, {
      groups: ['admin'],
      excludeExtraneousValues: true,
    }) as UsuarioResponseDto[]
  }

  @Get(':id')
  @Roles(Rol.ADMIN)
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async getById(@Param('id', ParseIntPipe) id: number): Promise<UsuarioResponseDto> {
    const userData = await this.service.getById(id)

    return plainToInstance(UsuarioResponseDto, userData, {
      groups: ['admin'],
      excludeExtraneousValues: true,
    })
  }

  /* @Get('me')
  async getSelfData(@User() user: Usuario): Promise<UsuarioResponseDto> {
    const userData = await this.service.getById(user.id)
    const groups = user.rol.nombre === Rol.ADMIN ? ['admin'] : []

    return plainToInstance(UsuarioResponseDto, userData, {
      groups: groups,
      excludeExtraneousValues: true,
    })
  }

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
