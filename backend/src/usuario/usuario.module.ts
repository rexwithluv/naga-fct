import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UtilsModule } from '../utils/utils.module'
import { UsuarioController } from './usuario.controller'
import { Usuario } from './usuario.entity'
import { UsuarioRepository } from './usuario.repository'
import { UsuarioService } from './usuario.service'

@Module({
  imports: [TypeOrmModule.forFeature([Usuario]), UtilsModule],
  controllers: [UsuarioController],
  providers: [UsuarioService, UsuarioRepository],
  exports: [UsuarioService],
})
export class UsuarioModule {}
