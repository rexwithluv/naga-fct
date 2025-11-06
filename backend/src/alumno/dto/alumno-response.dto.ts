import { Expose, Transform, Type } from 'class-transformer'
import { ConcelloResponseDto } from '../../concello/dto/concello-response.dto'
import { EstadoAlumnoResponseDto } from '../../estado-alumno/dto/estado-alumno-response.dto'
import { TutorCentroResponseDto } from '../../tutor-centro/dto/tutor-centro-response.dto'

export class AlumnoResponseDto {
  @Expose()
  @Transform(({ value }) => String(value))
  readonly id: string

  @Expose()
  readonly dniNie: string

  @Expose()
  readonly nombre: string

  @Expose()
  readonly apellidos: string

  @Expose()
  readonly email: string

  @Expose()
  readonly telefono: string

  @Expose()
  readonly numeroSeguridadSocial: string

  @Expose()
  @Type(() => ConcelloResponseDto)
  readonly concello: ConcelloResponseDto

  @Expose()
  @Type(() => EstadoAlumnoResponseDto)
  readonly estadoAlumno: EstadoAlumnoResponseDto

  @Expose({ groups: ['ADMIN'] })
  @Type(() => TutorCentroResponseDto)
  readonly tutorCentro: TutorCentroResponseDto
}
