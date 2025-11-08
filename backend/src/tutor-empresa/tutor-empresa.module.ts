import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TutorEmpresaRepository } from './tutor-empres.repository'
import { TutorEmpresaController } from './tutor-empresa.controller'
import { TutorEmpresa } from './tutor-empresa.entity'
import { TutorEmpresaService } from './tutor-empresa.service'

@Module({
  imports: [TypeOrmModule.forFeature([TutorEmpresa])],
  controllers: [TutorEmpresaController],
  providers: [TutorEmpresaService, TutorEmpresaRepository],
  exports: [TutorEmpresaService],
})
export class TutorEmpresaModule {}
