import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { TutorEmpresa } from './tutor-empresa.entity'

@Injectable()
export class TutorEmpresaService {
  constructor(
    @InjectRepository(TutorEmpresa)
    private readonly repository: Repository<TutorEmpresa>,
  ) {}

  async getAll(): Promise<TutorEmpresa[]> {
    return await this.repository.find({ relations: ['empresa'] })
  }
}
