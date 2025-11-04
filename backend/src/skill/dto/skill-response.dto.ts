import { Expose, Transform } from 'class-transformer'
import { EspecialidadResponseDto } from '../../especialidad/dto/especialidad-response.dto'

export class SkillResponseDto {
  @Expose()
  @Transform(({ value }) => String(value))
  readonly id: string

  @Expose()
  readonly nombre: string

  @Expose()
  readonly especialidad: EspecialidadResponseDto
}
