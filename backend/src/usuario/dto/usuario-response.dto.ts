import { Expose, Type } from 'class-transformer'
import { RolUsuarioResponseDto } from '../../rol-usuario/dto/rol-usuario-response.dto'

export class UsuarioResponseDto {
  @Expose()
  id: number

  @Expose()
  email: string

  @Expose()
  activo: boolean

  @Expose()
  @Type(() => RolUsuarioResponseDto)
  rol: RolUsuarioResponseDto

  @Expose()
  tutorCentro: any
}
