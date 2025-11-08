import { Injectable } from '@nestjs/common'
import { Usuario } from './usuario.entity'
import { UsuarioRepository } from './usuario.repository'

@Injectable()
export class UsuarioService {
  constructor(private readonly repository: UsuarioRepository) {}

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
    if (hasTutorCentro === undefined) {
      return await this.repository.findAll()
    }
    return await this.repository.findAllWhereTutorCentro(hasTutorCentro)
  }

  async getById(id: string | number): Promise<Usuario> {
    return await this.repository.findById(Number(id))
  }

  async getByEmail(email: string): Promise<Usuario> {
    return await this.repository.findByEmail(email)
  }
}
