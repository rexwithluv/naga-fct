import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Especialidad } from '../especialidad/especialidad.entity'
import { Usuario } from '../usuario/usuario.entity'
import { UtilsService } from '../utils/utils.service'
import { Skill } from './skill.entity'

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(Skill) private readonly repository: Repository<Skill>,
    private readonly utils: UtilsService,
  ) {}

  async getAll(usuario: Usuario): Promise<Skill[]> {
    if (this.utils.isAdmin(usuario)) {
      return this.repository.find()
    }

    const usuarioEspecialidad: Especialidad = usuario.tutorCentro.curso.especialidad
    return this.repository.find({
      where: {
        especialidad: usuarioEspecialidad,
      },
    })
  }
}
