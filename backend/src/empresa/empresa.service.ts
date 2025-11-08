import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { JwtPayloadDto } from '../auth/dto/jwt-payload.dto'
import { Especialidad } from '../especialidad/especialidad.entity'
import { UsuarioService } from '../usuario/usuario.service'
import { UtilsService } from '../utils/utils.service'
import { Empresa } from './empresa.entity'

@Injectable()
export class EmpresaService {
  constructor(
    @InjectRepository(Empresa) private readonly repository: Repository<Empresa>,
    private readonly utils: UtilsService,
    private readonly usuarioServie: UsuarioService,
  ) {}

  private async getUsuarioEspecialidad(jwtUser: JwtPayloadDto): Promise<Especialidad | null> {
    const user = await this.usuarioServie.getById(jwtUser.id)
    return user?.tutorCentro?.curso?.especialidad
  }

  async getAll(jwtUser: JwtPayloadDto): Promise<Empresa[]> {
    const groupsRelations = ['concello', 'skills', 'especialidad']
    if (this.utils.isAdmin(jwtUser)) {
      return await this.repository.find({ relations: groupsRelations })
    }

    const usuarioEspecialidad = (await this.usuarioServie.getById(jwtUser.id)).tutorCentro.curso
      .especialidad
    if (!usuarioEspecialidad) {
      return []
    }

    return await this.repository.find({
      where: {
        especialidad: { id: usuarioEspecialidad.id },
      },
      relations: groupsRelations,
    })
  }

  async getById(jwtUser: JwtPayloadDto, id: number) {
    if (this.utils.isAdmin(jwtUser)) {
      return await this.repository.find()
    }

    const usuarioEspecialidad = await this.getUsuarioEspecialidad(jwtUser)
    if (!usuarioEspecialidad) {
      return []
    }

    return await this.repository.findOneOrFail({
      where: {
        id: id,
        especialidad: { id: usuarioEspecialidad.id },
      },
    })
  }
}
