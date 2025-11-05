import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { ConcelloService } from './concello.service'
import { ConcelloResponseDto } from './dto/concello-response.dto'

@Controller('concellos')
export class ConcelloController {
  constructor(private readonly service: ConcelloService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(@Query('nombre') name: string = '') {
    const concellos = await this.service.getAll(name)

    return plainToInstance(ConcelloResponseDto, concellos)
  }
}
