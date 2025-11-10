import { Expose } from 'class-transformer'

export class EspecialidadResponseDto {
  @Expose()
  readonly id: number

  @Expose()
  readonly nombre: string
}
