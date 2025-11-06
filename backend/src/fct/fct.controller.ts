import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { FctResponseDto } from './dto/fct-response.dto'
import { FctService } from './fct.service'

@Controller('fct')
export class FctController {
  constructor(private readonly service: FctService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll() {
    const fct = await this.service.getAll()

    return plainToInstance(FctResponseDto, fct)
  }
}
