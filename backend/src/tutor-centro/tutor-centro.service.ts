import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { TutorCentro } from './tutor-centro.entity'

@Injectable()
export class TutorCentroService {
  constructor(
    @InjectRepository(TutorCentro)
    private readonly repository: Repository<TutorCentro>,
  ) {}

  async getAll(): Promise<TutorCentro[]> {
    return await this.repository.find({ relations: ['curso', 'usuario'] })
  }
}
