import { Expose, Type } from 'class-transformer'
import { EspecialidadResponseDto } from '../../especialidad/dto/especialidad-response.dto'

export class SkillResponseDto {
  @Expose()
  readonly id: number

  @Expose()
  readonly nombre: string

  @Expose()
  @Type(() => EspecialidadResponseDto)
  readonly especialidad: EspecialidadResponseDto
}
