import { Expose, Transform } from 'class-transformer'

const idToString = ({ value }): string => {
  return String(value)
}

export class RolUsuarioResponseDto {
  @Expose()
  @Transform(idToString)
  id: string

  @Expose()
  nombre: string
}
