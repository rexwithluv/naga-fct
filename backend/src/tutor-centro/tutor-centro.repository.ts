import { Injectable } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'
import { TutorCentro } from './tutor-centro.entity'

@Injectable()
export class TutorCentroRepository extends Repository<TutorCentro> {
  constructor(private dataSource: DataSource) {
    super(TutorCentro, dataSource.createEntityManager())
  }

  private readonly relalations: string[] = ['curso', 'usuario']

  async findAll(): Promise<TutorCentro[]> {
    return await this.find({ relations: this.relalations })
  }

  async findById(id: number): Promise<TutorCentro> {
    return await this.findOneOrFail({
      relations: this.relalations,
      where: {
        id: id,
      },
    })
  }
}
