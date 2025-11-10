import { Expose, Type } from 'class-transformer'
import { AlumnoMinimalResponseDto } from '../../alumno/dto/alumno-minimal-response.dto'
import { TutorCentroMinimalResponseDto } from '../../tutor-centro/dto/tutor-centro-minimal-response.dto'
import { TutorEmpresaMinimalResponseDto } from '../../tutor-empresa/dto/tutor-empresa-minimal-response.dto'

export class FctResponseDto {
  @Expose()
  readonly id: number

  @Expose()
  @Type(() => AlumnoMinimalResponseDto)
  readonly alumno: AlumnoMinimalResponseDto

  @Expose({ groups: ['admin'] })
  @Type(() => TutorCentroMinimalResponseDto)
  readonly tutorCentro: TutorCentroMinimalResponseDto

  @Expose()
  @Type(() => TutorEmpresaMinimalResponseDto)
  readonly tutorEmpresa: TutorEmpresaMinimalResponseDto

  @Expose()
  readonly fechaInicio: string

  @Expose()
  readonly fechaFin: string
}
