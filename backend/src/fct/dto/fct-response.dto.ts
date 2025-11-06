import { Expose, Transform, Type } from 'class-transformer'
import { AlumnoResponseDto } from '../../alumno/dto/alumno-response.dto'
import { EmpresaResponseDto } from '../../empresa/dto/empresa-response.dto'
import { TutorEmpresaResponseDto } from '../../tutor-empresa/dto/tutor-empresa-response.dto'

export class FctResponseDto {
  @Expose()
  @Transform(({ value }) => String(value))
  readonly id: string

  @Expose()
  @Type(() => AlumnoResponseDto)
  readonly alumno: AlumnoResponseDto

  @Expose()
  @Type(() => TutorEmpresaResponseDto)
  readonly tutorEmpresa: TutorEmpresaResponseDto

  @Expose()
  @Type(() => EmpresaResponseDto)
  @Transform(({ obj }) => (obj.tutorEmpresa ? obj.tutorEmpresa.empresa : null))
  readonly empresa: EmpresaResponseDto

  @Expose()
  readonly fechaInicio: string

  @Expose()
  readonly fechaFin: string
}
