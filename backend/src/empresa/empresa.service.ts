import { ForbiddenException, Injectable } from '@nestjs/common'
import { JwtPayloadDto } from '../auth/dto/jwt-payload.dto'
import { SkillService } from '../skill/skill.service'
import { UsuarioService } from '../usuario/usuario.service'
import { UtilsService } from '../utils/utils.service'
import { EmpresaCreateDto } from './dto/empresa-create.dto'
import { Empresa } from './empresa.entity'
import { EmpresaRepository } from './empresa.repository'

@Injectable()
export class EmpresaService {
  constructor(
    private readonly repository: EmpresaRepository,
    private readonly utils: UtilsService,
    private readonly usuarioService: UsuarioService,
    private readonly skillService: SkillService,
  ) {}

  private async getUsuarioEspecialidadId(jwtUser: JwtPayloadDto): Promise<number | undefined> {
    const user = await this.usuarioService.getById(jwtUser.id)
    return user?.tutorCentro?.curso?.especialidad?.id
  }

  async getAll(jwtUser: JwtPayloadDto): Promise<Empresa[]> {
    if (this.utils.isAdmin(jwtUser)) {
      return await this.repository.findAll()
    }

    const usuarioEspecialidadId: number | undefined = await this.getUsuarioEspecialidadId(jwtUser)
    if (!usuarioEspecialidadId) {
      return []
    }

    return await this.repository.findAllWhereEspecialidadId(usuarioEspecialidadId)
  }

  async getById(jwtUser: JwtPayloadDto, id: number): Promise<Empresa> {
    const empresa: Empresa = await this.repository.findById(id)
    if (this.utils.isAdmin(jwtUser)) {
      return empresa
    }

    const usuarioEspecialidadId: number | undefined = await this.getUsuarioEspecialidadId(jwtUser)
    const empresaEspecialidadId: number = empresa.especialidad.id

    if (!usuarioEspecialidadId || usuarioEspecialidadId !== empresaEspecialidadId) {
      throw new ForbiddenException("Don't have permission to see this Empresa")
    }

    return await this.repository.findByIdAndEspecialidadId(id, usuarioEspecialidadId)
  }

  async create(jwtUser: JwtPayloadDto, dto: EmpresaCreateDto) {
    const isAdmin = this.utils.isAdmin(jwtUser)
    let especialidadId: number = 0
    if (isAdmin) {
      especialidadId = dto.especialidadId
    } else {
      const usuario = await this.usuarioService.getById(jwtUser.id)
      especialidadId = usuario.tutorCentro.curso.especialidad.id
    }

    const skills = await Promise.all(
      dto.skills.map((skillId) => this.skillService.getById(skillId)),
    )
    const contacto = dto.contacto
    const empresa = this.repository.create({
      ...dto,
      contactoEmail: contacto.email,
      contactoNombre: contacto.nombre,
      contactoTelefono: contacto.telefono,
      concello: { id: dto.concelloId },
      especialidad: { id: especialidadId },
      skills: skills,
    })
    const newEmpresa = await this.repository.save(empresa)

    return await this.repository.findById(newEmpresa.id)
  }

  async delete(jwtUser: JwtPayloadDto, id: number): Promise<void> {
    const empresa = await this.getById(jwtUser, id)

    await this.repository.update(empresa.id, { activa: false })
  }
}
