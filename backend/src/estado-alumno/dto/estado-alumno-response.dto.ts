import { Expose } from 'class-transformer'

export class EstadoAlumnoResponseDto {
  @Expose()
  readonly id: number

  @Expose()
  readonly nombre: string
}
