import { Injectable } from '@nestjs/common'
import { JwtPayloadDto } from '../auth/dto/jwt-payload.dto'
import { UsuarioService } from '../usuario/usuario.service'
import { UtilsService } from '../utils/utils.service'
import { Empresa } from './empresa.entity'
import { EmpresaRepository } from './empresa.repository'

@Injectable()
export class EmpresaService {
  constructor(
    private readonly repository: EmpresaRepository,
    private readonly utils: UtilsService,
    private readonly usuarioService: UsuarioService,
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

  async getById(jwtUser: JwtPayloadDto, id: number) {
    if (this.utils.isAdmin(jwtUser)) {
      return await this.repository.findById(id)
    }

    const usuarioEspecialidadId: number | undefined = await this.getUsuarioEspecialidadId(jwtUser)
    if (!usuarioEspecialidadId) {
      return []
    }

    return await this.repository.findByIdAndEspecialidadId(id, usuarioEspecialidadId)
  }
}
