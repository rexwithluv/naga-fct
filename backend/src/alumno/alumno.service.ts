import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Alumno } from './alumno.entity'

@Injectable()
export class AlumnoService {
  constructor(@InjectRepository(Alumno) private readonly repository: Repository<Alumno>) {}

  async getAll(): Promise<Alumno[]> {
    return await this.repository.find({
      relations: [
        'concello',
        'estadoAlumno',
        'tutorCentro',
        'tutorCentro.curso',
        'tutorCentro.usuario',
      ],
    })
  }
}
