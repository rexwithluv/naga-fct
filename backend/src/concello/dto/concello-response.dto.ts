import { Expose } from 'class-transformer'

export class ConcelloResponseDto {
  @Expose()
  readonly id: number

  @Expose()
  readonly nombre: string
}
