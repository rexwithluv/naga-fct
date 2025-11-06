import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TutorEmpresaController } from './tutor-empresa.controller'
import { TutorEmpresa } from './tutor-empresa.entity'
import { TutorEmpresaService } from './tutor-empresa.service'

@Module({
  imports: [TypeOrmModule.forFeature([TutorEmpresa])],
  controllers: [TutorEmpresaController],
  providers: [TutorEmpresaService],
  exports: [TutorEmpresaService],
})
export class TutorEmpresaModule {}
