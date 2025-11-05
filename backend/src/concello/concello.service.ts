import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Like, Repository } from 'typeorm'
import { Concello } from './concello.entity'

@Injectable()
export class ConcelloService {
  constructor(
    @InjectRepository(Concello)
    private readonly repository: Repository<Concello>,
  ) {}

  async getAll(name: string): Promise<Concello[]> {
    if (name !== '') {
      return await this.repository.find({ where: { nombre: Like(`${name}%`) } })
    }
    return await this.repository.find()
  }

  async getById(id: number): Promise<Concello> {
    return await this.repository.findOneByOrFail({ id: id })
  }
}
