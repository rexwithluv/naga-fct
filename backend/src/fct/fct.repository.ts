import { Injectable } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'
import { Fct } from './fct.entity'

@Injectable()
export class FctRepository extends Repository<Fct> {
  constructor(private dataSource: DataSource) {
    super(Fct, dataSource.createEntityManager())
  }

  private readonly relations: string[] = [
    'alumno',
    'alumno.tutorCentro',
    'tutorEmpresa',
    'tutorEmpresa.empresa',
  ]

  async findAll(): Promise<Fct[]> {
    return await this.find({ relations: this.relations })
  }

  async findAllWhereTutorCentroId(tutorCentroId: number): Promise<Fct[]> {
    return await this.find({
      relations: this.relations,
      where: { alumno: { tutorCentro: { id: tutorCentroId } } },
    })
  }

  async findById(id: number): Promise<Fct> {
    return await this.findOneOrFail({ relations: this.relations, where: { id: id } })
  }
}
