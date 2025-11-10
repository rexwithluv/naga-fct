import { Expose, Type } from 'class-transformer'
import { EmpresaMinimalResponseDto } from '../../empresa/dto/empresa-minimal-response.dto'

export class TutorEmpresaMinimalResponseDto {
  @Expose()
  readonly id: number

  @Expose()
  @Type(() => EmpresaMinimalResponseDto)
  readonly empresa: EmpresaMinimalResponseDto

  @Expose()
  readonly nombre: string

  @Expose()
  readonly apellidos: string

  @Expose()
  readonly email: string

  @Expose()
  readonly telefono: string
}
