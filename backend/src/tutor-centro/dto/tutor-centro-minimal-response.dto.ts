import { Expose, Transform } from 'class-transformer'

export class TutorCentroMinimalResponseDto {
  @Expose()
  readonly id: number

  @Expose()
  readonly nombre: string

  @Expose()
  readonly apellidos: string

  @Expose()
  readonly email: string
}
