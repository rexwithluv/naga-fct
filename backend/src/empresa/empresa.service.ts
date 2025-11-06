import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Especialidad } from '../especialidad/especialidad.entity'
import { Usuario } from '../usuario/usuario.entity'
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

  private getUsuarioEspecialidad(usuario: Usuario): Especialidad | null {
    return usuario?.tutorCentro?.curso?.especialidad
  }

  async getAll(usuario: Usuario): Promise<Empresa[]> {
    const groupsRelations = ['concello', 'skills', 'especialidad']
    if (this.utils.isAdmin(usuario)) {
      return await this.repository.find({ relations: groupsRelations })
    }

    const usuarioEspecialidad = (await this.usuarioServie.getById(usuario.id)).tutorCentro.curso
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

  async getById(usuario: Usuario, id: number) {
    if (this.utils.isAdmin(usuario)) {
      return await this.repository.find()
    }

    const usuarioEspecialidad = this.getUsuarioEspecialidad(usuario)
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
