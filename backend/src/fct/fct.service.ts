import { ForbiddenException, Injectable } from '@nestjs/common'
import { JwtPayloadDto } from '../auth/dto/jwt-payload.dto'
import { UsuarioService } from '../usuario/usuario.service'
import { UtilsService } from '../utils/utils.service'
import { Fct } from './fct.entity'
import { FctRepository } from './fct.repository'

@Injectable()
export class FctService {
  constructor(
    private readonly repository: FctRepository,
    private readonly utils: UtilsService,
    private readonly usuarioService: UsuarioService,
  ) {}

  async getAll(jwtUser: JwtPayloadDto) {
    if (this.utils.isAdmin(jwtUser)) {
      return await this.repository.findAll()
    }
    const tutorCentro = (await this.usuarioService.getById(jwtUser.id)).tutorCentro
    const tutorCentroId = tutorCentro.id
    return await this.repository.findAllWhereTutorCentroId(tutorCentroId)
  }

  async getById(jwtUser: JwtPayloadDto, id: string): Promise<Fct> {
    if (this.utils.isAdmin(jwtUser)) {
      return await this.repository.findById(Number(id))
    }

    const tutorCentro = (await this.usuarioService.getById(jwtUser.id)).tutorCentro
    const fct = await this.repository.findById(Number(id))
    if (fct.alumno.tutorCentro.id !== tutorCentro.id) {
      throw new ForbiddenException()
    }

    return fct
  }
}
