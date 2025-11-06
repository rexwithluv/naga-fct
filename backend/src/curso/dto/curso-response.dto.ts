import { Expose, Transform, Type } from 'class-transformer'
import { EspecialidadResponseDto } from '../../especialidad/dto/especialidad-response.dto'
import { TutorCentroResponseDto } from '../../tutor-centro/dto/tutor-centro-response.dto'

export class CursoResponseDto {
  @Expose()
  @Transform(({ value }) => String(value))
  readonly id: string

  @Expose()
  readonly codigo: string

  @Expose()
  readonly nombre: string

  @Expose()
  @Type(() => EspecialidadResponseDto)
  readonly especialidad: EspecialidadResponseDto

  @Expose()
  @Type(() => TutorCentroResponseDto)
  readonly tutorCentro: TutorCentroResponseDto | null
}
