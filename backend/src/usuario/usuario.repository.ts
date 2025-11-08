import { Injectable } from '@nestjs/common'
import { DataSource, IsNull, Not, Repository } from 'typeorm'
import { Usuario } from './usuario.entity'

@Injectable()
export class UsuarioRepository extends Repository<Usuario> {
  constructor(private dataSource: DataSource) {
    super(Usuario, dataSource.createEntityManager())
  }

  private readonly relations: string[] = [
    'rol',
    'tutorCentro',
    'tutorCentro.curso',
    'tutorCentro.curso.especialidad',
  ]

  async findAll() {
    return await this.find({ relations: this.relations })
  }

  async findByEmail(email: string): Promise<Usuario> {
    return await this.findOneOrFail({ relations: this.relations, where: { email } })
  }

  async findById(id: number) {
    return await this.findOneOrFail({
      relations: this.relations,
      where: { id: Number(id) },
    })
  }

  async findAllWhereTutorCentro(tutorCentro: boolean) {
    return await this.find({
      relations: this.relations,
      where: { tutorCentro: tutorCentro ? IsNull() : Not(IsNull()) },
    })
  }
}
