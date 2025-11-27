import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator'

export class EmpresaCreateDto {
  @IsNotEmpty()
  @IsString()
  readonly nombre: string

  @IsNotEmpty()
  @IsNumber()
  readonly concelloId: number

  @IsNotEmpty()
  @IsString()
  readonly direccion: string

  @IsString()
  readonly observaciones: string

  @IsObject()
  readonly contacto: { nombre: string; email: string; telefono: string }

  @IsBoolean()
  readonly activa: boolean

  @IsNumber()
  readonly plazas: number

  @IsArray()
  readonly skills: number[]

  @IsOptional()
  @IsNotEmpty({ groups: ['admin'] })
  @IsNumber()
  readonly especialidadId: number
}
