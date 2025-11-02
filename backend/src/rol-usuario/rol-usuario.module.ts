import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RolUsuarioController } from './rol-usuario.controller'
import { RolUsuario } from './rol-usuario.entity'
import { RolUsuarioService } from './rol-usuario.service'

@Module({
  imports: [TypeOrmModule.forFeature([RolUsuario])],
  controllers: [RolUsuarioController],
  providers: [RolUsuarioService],
  exports: [RolUsuarioService],
})
export class RolUsuarioModule {}
