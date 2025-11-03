import { Expose, Transform } from 'class-transformer'

export class ConcelloResponseDto {
  @Expose()
  @Transform(({ value }) => String(value))
  readonly id: string

  @Expose()
  readonly nombre: string
}
