import { Expose, Transform, Type } from 'class-transformer'
import { EmpresaResponseDto } from '../../empresa/dto/empresa-response.dto'

export class TutorEmpresaResponseDto {
  @Expose()
  @Transform(({ value }) => String(value))
  readonly id: string

  @Expose()
  @Type(() => EmpresaResponseDto)
  readonly empresa: EmpresaResponseDto

  @Expose()
  readonly nombre: string

  @Expose()
  readonly apellidos: string

  @Expose()
  readonly email: string

  @Expose()
  readonly telefono: string
}
