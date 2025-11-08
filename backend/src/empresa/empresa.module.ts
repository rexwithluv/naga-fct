import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsuarioModule } from '../usuario/usuario.module'
import { UtilsModule } from '../utils/utils.module'
import { EmpresaController } from './empresa.controller'
import { Empresa } from './empresa.entity'
import { EmpresaRepository } from './empresa.repository'
import { EmpresaService } from './empresa.service'

@Module({
  imports: [TypeOrmModule.forFeature([Empresa]), UtilsModule, UsuarioModule],
  controllers: [EmpresaController],
  providers: [EmpresaService, EmpresaRepository],
  exports: [EmpresaService],
})
export class EmpresaModule {}
