import { ForbiddenException, Injectable } from '@nestjs/common'
import { JwtPayloadDto } from '../auth/dto/jwt-payload.dto'
import { Usuario } from '../usuario/usuario.entity'
import { UsuarioService } from '../usuario/usuario.service'
import { UtilsService } from '../utils/utils.service'
import { Alumno } from './alumno.entity'
import { AlumnoRepository } from './alumno.repository'

@Injectable()
export class AlumnoService {
  constructor(
    private readonly repository: AlumnoRepository,
    private readonly utils: UtilsService,
    private readonly usuarioService: UsuarioService,
  ) {}

  private async getCursoIdFromJwtUser(jwtUser: JwtPayloadDto): Promise<number> {
    const user: Usuario = await this.usuarioService.getById(jwtUser.id)
    return user?.tutorCentro?.curso?.id
  }
  async getAll(jwtUser: JwtPayloadDto): Promise<Alumno[]> {
    const isAdmin = this.utils.isAdmin(jwtUser)
    if (isAdmin) {
      return await this.repository.findAll()
    }

    const cursoId: number = await this.getCursoIdFromJwtUser(jwtUser)
    if (!cursoId) {
      return []
    }

    return await this.repository.findAllWhereCursoId(cursoId)
  }

  async getById(jwtUser: JwtPayloadDto, id: string): Promise<Alumno> {
    const alumno = await this.repository.findById(Number(id))

    const isAdmin = this.utils.isAdmin(jwtUser)
    if (isAdmin) {
      return alumno
    }

    const cursoIdUsuario: number = await this.getCursoIdFromJwtUser(jwtUser)
    const cursoIdAlumno: number = alumno.tutorCentro.curso.id

    if (cursoIdUsuario !== cursoIdAlumno) {
      throw new ForbiddenException("Don't have permission to see this Alumno")
    }

    return await this.repository.findById(Number(id))
  }
}
