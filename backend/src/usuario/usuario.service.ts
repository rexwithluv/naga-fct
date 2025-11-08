import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IsNull, Not, Repository } from 'typeorm'
import { Usuario } from './usuario.entity'

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly repository: Repository<Usuario>,
  ) {}

  private async findByEmail(email: string): Promise<Usuario> {
    return await this.repository.findOneOrFail({ where: { email }, relations: ['rol'] })
  }
  // private async existsByEmail(email: string): Promise<boolean> {
  //   return this.repository.exists({ where: { email }, relations: ['rol'] })
  // }
  // private async findWithTutorCentro(): Promise<Usuario[]> {
  //   return this.repository.find({
  //     where: { tutorCentro: Not(IsNull()) },
  //   })
  // }
  // private async findWithoutTutorCentro(): Promise<Usuario[]> {
  //   return this.repository.find({
  //     where: { tutorCentro: IsNull() },
  //   })
  // }

  async getAll(hasTutorCentro?: boolean): Promise<Usuario[]> {
    let whereClause: object = {}

    if (hasTutorCentro === true) {
      whereClause = { tutorCentro: Not(IsNull()) }
    } else if (hasTutorCentro === false) {
      whereClause = { tutorCentro: IsNull() }
    }

    return await this.repository.find({
      where: whereClause,
      relations: ['rol', 'tutorCentro', 'tutorCentro.curso', 'tutorCentro.curso.especialidad'],
    })
  }

  async getById(id: number): Promise<Usuario> {
    return await this.repository.findOneOrFail({
      where: { id: id },
      relations: ['rol', 'tutorCentro', 'tutorCentro.curso', 'tutorCentro.curso.especialidad'],
    })
  }

  async getByEmail(email: string): Promise<Usuario> {
    return await this.findByEmail(email)
  }
}
