import { Injectable } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'
import { Empresa } from './empresa.entity'

@Injectable()
export class EmpresaRepository extends Repository<Empresa> {
  constructor(private dataSource: DataSource) {
    super(Empresa, dataSource.createEntityManager())
  }

  private readonly relations: string[] = ['concello', 'skills', 'especialidad']

  async findAll(): Promise<Empresa[]> {
    return await this.find({ relations: this.relations })
  }

  async findById(id: number): Promise<Empresa> {
    return await this.findOneOrFail({ relations: this.relations, where: { id: id } })
  }

  async findByIdAndEspecialidadId(id: number, especialidadId: number): Promise<Empresa> {
    return await this.findOneOrFail({
      relations: this.relations,
      where: { id: id, especialidad: { id: especialidadId } },
    })
  }

  async findAllWhereEspecialidadId(especialidadId: number): Promise<Empresa[]> {
    return this.find({
      relations: this.relations,
      where: { especialidad: { id: especialidadId } },
    })
  }
}
