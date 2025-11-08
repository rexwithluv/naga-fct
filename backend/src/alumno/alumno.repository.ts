import { Injectable } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'
import { Alumno } from './alumno.entity'

@Injectable()
export class AlumnoRepository extends Repository<Alumno> {
  constructor(private dataSource: DataSource) {
    super(Alumno, dataSource.createEntityManager())
  }

  private readonly relations: string[] = [
    'concello',
    'estadoAlumno',
    'tutorCentro',
    'tutorCentro.curso',
    'tutorCentro.usuario',
  ]

  async findAll(): Promise<Alumno[]> {
    return await this.find({ relations: this.relations })
  }

  async findById(id: number): Promise<Alumno> {
    return await this.findOneOrFail({
      relations: this.relations,
      where: {
        id: id,
      },
    })
  }

  async findAllWhereCursoId(cursoId: number): Promise<Alumno[]> {
    return await this.find({
      relations: this.relations,
      where: {
        tutorCentro: {
          curso: { id: cursoId },
        },
      },
    })
  }
}
