import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UtilsModule } from '../utils/utils.module'
import { FctController } from './fct.controller'
import { Fct } from './fct.entity'
import { FctService } from './fct.service'

@Module({
  imports: [TypeOrmModule.forFeature([Fct]), UtilsModule],
  controllers: [FctController],
  providers: [FctService],
  exports: [FctService],
})
export class FctModule {}
