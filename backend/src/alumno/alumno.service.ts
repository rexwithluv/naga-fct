import { ForbiddenException, Injectable } from '@nestjs/common'
import { JwtPayloadDto } from '../auth/dto/jwt-payload.dto'
import { EstadoAlumnoService } from '../estado-alumno/estado-alumno.service'
import { Usuario } from '../usuario/usuario.entity'
import { UsuarioService } from '../usuario/usuario.service'
import { UtilsService } from '../utils/utils.service'
import { Alumno } from './alumno.entity'
import { AlumnoRepository } from './alumno.repository'
import { AlumnoCreateDto } from './dto/alumno-create.dto'
import { AlumnoUpdateDto } from './dto/alumno-update.dto'

@Injectable()
export class AlumnoService {
  constructor(
    private readonly repository: AlumnoRepository,
    private readonly utils: UtilsService,
    private readonly usuarioService: UsuarioService,
    private readonly estadoAlumnoService: EstadoAlumnoService,
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

  async getById(jwtUser: JwtPayloadDto, id: number): Promise<Alumno> {
    const alumno = await this.repository.findById(id)

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

  async create(jwtUser: JwtPayloadDto, dto: AlumnoCreateDto) {
    const isAdmin = this.utils.isAdmin(jwtUser)
    let tutorCentroId: number = 0
    if (isAdmin) {
      tutorCentroId = dto.tutorCentroId
    } else {
      const usuario = await this.usuarioService.getById(jwtUser.id)
      tutorCentroId = usuario.tutorCentro.id
    }

    const alumno = this.repository.create({
      ...dto,
      concello: { id: dto.concelloId },
      estadoAlumno: { id: dto.estadoAlumnoId },
      tutorCentro: { id: tutorCentroId },
    })
    const newAlumno = await this.repository.save(alumno)

    return await this.repository.findById(newAlumno.id)
  }

  async update(jwtUser: JwtPayloadDto, id: number, dto: AlumnoUpdateDto) {
    const alumno = await this.getById(jwtUser, id)

    const merge = this.repository.merge(alumno, dto)
    return await this.repository.save(merge)
  }

  async delete(jwtUser: JwtPayloadDto, id: number) {
    const alumno = await this.getById(jwtUser, id)

    const estadoAlumnoInactivo = await this.estadoAlumnoService.getByNombre('INACTIVE')
    await this.repository.update(alumno.id, {
      estadoAlumno: estadoAlumnoInactivo,
    })
  }
}
