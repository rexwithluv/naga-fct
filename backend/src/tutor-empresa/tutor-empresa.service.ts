import { Injectable } from '@nestjs/common'
import { TutorEmpresaRepository } from './tutor-empres.repository'
import { TutorEmpresa } from './tutor-empresa.entity'

@Injectable()
export class TutorEmpresaService {
  constructor(private readonly repository: TutorEmpresaRepository) {}

  async getAll(): Promise<TutorEmpresa[]> {
    return await this.repository.findAll()
  }

  async getById(id: string): Promise<TutorEmpresa> {
    return await this.repository.findById(Number(id))
  }
}
