import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Fct } from './fct.entity'

@Injectable()
export class FctService {
  constructor(@InjectRepository(Fct) private readonly repository: Repository<Fct>) {}

  async getAll() {
    return await this.repository.find({
      relations: ['alumno', 'alumno.tutorCentro', 'tutorEmpresa', 'tutorEmpresa.empresa'],
    })
  }
}
