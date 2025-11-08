import { Expose, Transform, Type } from 'class-transformer'
import { ConcelloResponseDto } from '../../concello/dto/concello-response.dto'
import { EspecialidadResponseDto } from '../../especialidad/dto/especialidad-response.dto'
import { SkillResponseDto } from '../../skill/dto/skill-response.dto'

export class EmpresaResponseDto {
  @Expose()
  @Transform(({ value }) => String(value))
  readonly id: string

  @Expose()
  readonly nombre: string

  @Expose()
  @Type(() => ConcelloResponseDto)
  readonly concello: ConcelloResponseDto

  @Expose()
  readonly direccion: string

  @Expose()
  readonly observaciones: string

  @Expose({ groups: ['admin'] })
  @Type(() => EspecialidadResponseDto)
  readonly especialidad: EspecialidadResponseDto

  @Expose()
  @Transform(({ obj }) => {
    return {
      nombre: obj.contactoNombre,
      email: obj.contactoEmail,
      telefono: obj.contactoTelefono,
    }
  })
  readonly contacto: { nombre: string; email: string; telefono: string }

  @Expose()
  readonly activa: boolean

  @Expose()
  readonly plazas: number

  @Expose()
  @Type(() => SkillResponseDto)
  readonly skills: SkillResponseDto[]
}
