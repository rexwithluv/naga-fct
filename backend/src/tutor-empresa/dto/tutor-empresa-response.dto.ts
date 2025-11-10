import { Expose, Type } from 'class-transformer'
import { EmpresaResponseDto } from '../../empresa/dto/empresa-response.dto'

export class TutorEmpresaResponseDto {
  @Expose()
  readonly id: number

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
