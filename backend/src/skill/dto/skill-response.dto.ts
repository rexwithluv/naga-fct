import { Expose, Transform, Type } from 'class-transformer'
import { EspecialidadResponseDto } from '../../especialidad/dto/especialidad-response.dto'

export class SkillResponseDto {
  @Expose()
  @Transform(({ value }) => String(value))
  readonly id: string

  @Expose()
  readonly nombre: string

  @Expose()
  @Type(() => EspecialidadResponseDto)
  readonly especialidad: EspecialidadResponseDto
}
