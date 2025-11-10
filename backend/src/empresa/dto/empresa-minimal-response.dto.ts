import { Expose, Type } from 'class-transformer'
import { ConcelloResponseDto } from '../../concello/dto/concello-response.dto'
import { EspecialidadResponseDto } from '../../especialidad/dto/especialidad-response.dto'
import { SkillResponseDto } from '../../skill/dto/skill-response.dto'

export class EmpresaMinimalResponseDto {
  @Expose()
  readonly id: number

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
  @Type(() => SkillResponseDto)
  readonly skills: SkillResponseDto[]
}
