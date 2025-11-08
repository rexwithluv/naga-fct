import { Expose, Transform, Type } from 'class-transformer'
import { AlumnoMinimalResponseDto } from '../../alumno/dto/alumno-minimal-response.dto'
import { TutorCentroMinimalResponseDto } from '../../tutor-centro/dto/tutor-centro-minimal-response.dto'
import { TutorEmpresaMinimalResponseDto } from '../../tutor-empresa/dto/tutor-empresa-minimal-response.dto'

export class FctResponseDto {
  @Expose()
  @Transform(({ value }) => String(value))
  readonly id: string

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
  @Transform(({ obj }) => {
    const empresa = obj.tutorEmpresa ? obj.tutorEmpresa.empresa : null
    if (empresa === null) {
      return null
    }

    return {
      id: String(empresa.id),
      direccion: empresa.direccion,
      nombre: empresa.nombre,
      observaciones: empresa.observaciones,
    }
  })
  readonly empresa: any

  @Expose()
  readonly fechaInicio: string

  @Expose()
  readonly fechaFin: string
}
