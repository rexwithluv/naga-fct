import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { plainToInstance } from 'class-transformer'
import { ConcelloService } from './concello.service'
import { ConcelloResponseDto } from './dto/concello-response.dto'

@Controller('concellos')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard('jwt'))
export class ConcelloController {
  constructor(private readonly service: ConcelloService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(@Query('name') name?: string): Promise<ConcelloResponseDto[]> {
    const concellos = await this.service.getAll(name)

    return plainToInstance(ConcelloResponseDto, concellos)
  }
}
