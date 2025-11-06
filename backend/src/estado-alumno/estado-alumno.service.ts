import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { EstadoAlumno } from './estado-alumno.entity'

@Injectable()
export class EstadoAlumnoService {
  constructor(
    @InjectRepository(EstadoAlumno) private readonly repository: Repository<EstadoAlumno>,
  ) {}

  async getAll() {
    return this.repository.find()
  }
}
