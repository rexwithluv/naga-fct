import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsuarioModule } from '../usuario/usuario.module'
import { UtilsModule } from '../utils/utils.module'
import { FctController } from './fct.controller'
import { Fct } from './fct.entity'
import { FctRepository } from './fct.repository'
import { FctService } from './fct.service'

@Module({
  imports: [TypeOrmModule.forFeature([Fct]), UtilsModule, UsuarioModule],
  controllers: [FctController],
  providers: [FctService, FctRepository],
  exports: [FctService],
})
export class FctModule {}
