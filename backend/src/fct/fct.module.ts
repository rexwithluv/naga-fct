import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FctController } from './fct.controller'
import { Fct } from './fct.entity'
import { FctService } from './fct.service'

@Module({
  imports: [TypeOrmModule.forFeature([Fct])],
  controllers: [FctController],
  providers: [FctService],
  exports: [FctService],
})
export class FctModule {}
