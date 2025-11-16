import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator'

export class AlumnoCreateDto {
  @IsNotEmpty()
  @IsString()
  @Length(9, 9)
  readonly dniNie: string

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  readonly nombre: string

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  readonly apellidos: string

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string

  @IsNotEmpty()
  @IsString()
  readonly telefono: string

  @IsNotEmpty()
  @IsNumberString()
  @Length(12, 12)
  readonly numeroSeguridadSocial: string

  @IsNotEmpty()
  @IsNumber()
  readonly concelloId: number

  @IsNotEmpty()
  @IsNumber()
  readonly estadoAlumnoId: number

  @IsOptional()
  @IsNotEmpty({ groups: ['admin'] })
  @IsNumber()
  readonly tutorCentroId: number
}
