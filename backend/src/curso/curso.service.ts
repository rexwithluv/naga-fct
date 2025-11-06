import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Curso } from './curso.entity'

@Injectable()
export class CursoService {
  constructor(
    @InjectRepository(Curso)
    private readonly repository: Repository<Curso>,
  ) {}

  async getAll(): Promise<Curso[]> {
    return await this.repository.find({ relations: ['especialidad', 'tutorCentro'] })
  }
}
