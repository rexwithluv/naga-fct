import { Injectable } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'
import { TutorEmpresa } from './tutor-empresa.entity'

@Injectable()
export class TutorEmpresaRepository extends Repository<TutorEmpresa> {
  constructor(private dataSource: DataSource) {
    super(TutorEmpresa, dataSource.createEntityManager())
  }

  private readonly relations: string[] = ['empresa']

  async findAll(): Promise<TutorEmpresa[]> {
    return await this.find({ relations: this.relations })
  }

  async findById(id: number): Promise<TutorEmpresa> {
    return await this.findOneOrFail({ relations: this.relations, where: { id: id } })
  }
}
