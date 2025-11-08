import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { JwtPayloadDto } from '../auth/dto/jwt-payload.dto'
import { User } from '../common/decorators/user.decorator'
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

  async getAll(@User() jwtUser: JwtPayloadDto): Promise<Skill[]> {
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
