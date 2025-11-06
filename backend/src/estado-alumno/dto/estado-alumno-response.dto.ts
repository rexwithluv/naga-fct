import { Expose, Transform } from 'class-transformer'

export class EstadoAlumnoResponseDto {
  @Expose()
  @Transform(({ value }) => String(value))
  readonly id: string

  @Expose()
  readonly nombre: string
}
