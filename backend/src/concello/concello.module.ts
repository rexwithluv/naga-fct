import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConcelloController } from './concello.controller'
import { Concello } from './concello.entity'
import { ConcelloService } from './concello.service'

@Module({
  imports: [TypeOrmModule.forFeature([Concello])],
  controllers: [ConcelloController],
  providers: [ConcelloService],
  exports: [ConcelloService],
})
export class ConcelloModule {}
