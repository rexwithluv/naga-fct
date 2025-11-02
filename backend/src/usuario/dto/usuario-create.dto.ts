import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, Length } from 'class-validator'

export class UsuarioCreateDto {
  @IsEmail({}, { message: 'El email debe ser válido' })
  @IsNotEmpty({ message: 'El email es obligatorio' })
  @Length(1, 500, { message: 'El email debe tener un máximo de 500 caracteres' })
  email: string

  @IsNumber({}, { message: 'El ID del rol debe ser un número' })
  @IsNotEmpty({ message: 'El ID del rol es obligatorio' })
  rolId: number

  @IsNumber({}, { message: 'El ID del rol debe ser un número' })
  tutorCentroId: number

  @IsBoolean()
  activo: boolean
}
