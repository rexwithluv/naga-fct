import { Expose, Transform } from 'class-transformer'

export class EspecialidadResponseDto {
  @Expose()
  @Transform(({ value }) => String(value))
  id: string

  @Expose()
  nombre: string
}
