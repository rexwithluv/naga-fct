import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Concello } from './concello.entity'

@Injectable()
export class ConcelloService {
  constructor(
    @InjectRepository(Concello)
    private readonly repository: Repository<Concello>,
  ) {}

  async getAll(): Promise<Concello[]> {
    return await this.repository.find()
  }

  async getById(id: number): Promise<Concello> {
    return await this.repository.findOneByOrFail({ id: id })
  }
}
