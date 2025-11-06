import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Usuario } from '../usuario/usuario.entity'
import { UsuarioService } from '../usuario/usuario.service'
import { UtilsService } from '../utils/utils.service'
import { Skill } from './skill.entity'

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(Skill) private readonly repository: Repository<Skill>,
    private readonly utils: UtilsService,
    private readonly usuarioService: UsuarioService,
  ) {}

  async getAll(jwtUser: Usuario): Promise<Skill[]> {
    const groupsRelations: string[] = ['especialidad']
    if (this.utils.isAdmin(jwtUser)) {
      return this.repository.find({ relations: groupsRelations })
    }

    const user = await this.usuarioService.getById(jwtUser.id)
    const userEspecialidad = user.tutorCentro.curso.especialidad
    return this.repository.find({
      where: {
        especialidad: userEspecialidad,
      },
      relations: groupsRelations,
    })
  }
}
