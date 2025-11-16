import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { EstadoAlumno } from './estado-alumno.entity'

@Injectable()
export class EstadoAlumnoService {
  constructor(
    @InjectRepository(EstadoAlumno) private readonly repository: Repository<EstadoAlumno>,
  ) {}

  async getAll(): Promise<EstadoAlumno[]> {
    return await this.repository.find()
  }

  async getByNombre(nombre: string): Promise<EstadoAlumno> {
    return await this.repository.findOneOrFail({ where: { nombre: nombre } })
  }
}
