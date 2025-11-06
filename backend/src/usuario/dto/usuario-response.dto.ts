import { Exclude, Expose, Type } from 'class-transformer'
import { RolUsuarioResponseDto } from '../../rol-usuario/dto/rol-usuario-response.dto'
import { TutorCentroResponseDto } from '../../tutor-centro/dto/tutor-centro-response.dto'

export class UsuarioResponseDto {
  @Expose()
  readonly id: number

  @Expose()
  readonly email: string

  @Expose()
  readonly activo: boolean

  @Expose()
  @Type(() => RolUsuarioResponseDto)
  readonly rol: RolUsuarioResponseDto

  @Expose()
  @Type(() => TutorCentroResponseDto)
  readonly tutorCentro: TutorCentroResponseDto

  @Exclude()
  readonly password: string
}
