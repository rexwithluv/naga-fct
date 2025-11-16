import { PartialType } from '@nestjs/mapped-types'
import { AlumnoCreateDto } from './alumno-create.dto'

export class AlumnoUpdateDto extends PartialType(AlumnoCreateDto) {}
