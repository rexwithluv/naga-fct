import { Injectable } from '@nestjs/common'
import { TutorCentro } from './tutor-centro.entity'
import { TutorCentroRepository } from './tutor-centro.repository'

@Injectable()
export class TutorCentroService {
  constructor(private readonly repository: TutorCentroRepository) {}

  async getAll(): Promise<TutorCentro[]> {
    return await this.repository.findAll()
  }

  async getById(id: string) {
    return await this.repository.findById(Number(id))
  }
}
