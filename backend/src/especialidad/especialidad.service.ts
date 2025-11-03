import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Especialidad } from './especialidad.entity'

@Injectable()
export class EspecialidadService {
  constructor(
    @InjectRepository(Especialidad)
    private readonly repository: Repository<Especialidad>,
  ) {}

  async getAll(): Promise<Especialidad[]> {
    return this.repository.find()
  }

  async getById(id: number): Promise<Especialidad> {
    return this.repository.findOneByOrFail({
      id: id,
    })
  }
}
