import { Expose, Type } from 'class-transformer'
import { CursoResponseDto } from '../../curso/dto/curso-response.dto'
import { UsuarioResponseDto } from '../../usuario/dto/usuario-response.dto'

export class TutorCentroResponseDto {
  @Expose()
  readonly id: number

  @Expose()
  readonly nombre: string

  @Expose()
  readonly apellidos: string

  @Expose()
  readonly email: string

  @Expose()
  readonly activo: boolean

  @Expose()
  @Type(() => CursoResponseDto)
  readonly curso: CursoResponseDto

  @Expose()
  @Type(() => UsuarioResponseDto)
  readonly usuario: UsuarioResponseDto
}
