import { Expose, Type } from 'class-transformer'
import { ConcelloResponseDto } from '../../concello/dto/concello-response.dto'
import { EstadoAlumnoResponseDto } from '../../estado-alumno/dto/estado-alumno-response.dto'
import { TutorCentroMinimalResponseDto } from '../../tutor-centro/dto/tutor-centro-minimal-response.dto'

export class AlumnoMinimalResponseDto {
  @Expose()
  readonly id: number

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

  @Expose({ groups: ['admin'] })
  @Type(() => TutorCentroMinimalResponseDto)
  readonly tutorCentro: TutorCentroMinimalResponseDto
}
