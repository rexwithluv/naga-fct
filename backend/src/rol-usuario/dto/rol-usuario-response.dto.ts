import { Expose } from 'class-transformer'

export class RolUsuarioResponseDto {
  @Expose()
  readonly id: number

  @Expose()
  readonly nombre: string
}
