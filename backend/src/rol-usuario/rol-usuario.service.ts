import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { RolUsuario } from './rol-usuario.entity'

@Injectable()
export class RolUsuarioService {
  constructor(
    @InjectRepository(RolUsuario)
    private readonly repository: Repository<RolUsuario>,
  ) {}

  async getAll(): Promise<RolUsuario[]> {
    return await this.repository.find()
  }
}
