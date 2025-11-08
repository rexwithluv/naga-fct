import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsuarioModule } from '../usuario/usuario.module'
import { UtilsModule } from '../utils/utils.module'
import { AlumnoController } from './alumno.controller'
import { Alumno } from './alumno.entity'
import { AlumnoRepository } from './alumno.repository'
import { AlumnoService } from './alumno.service'

@Module({
  imports: [TypeOrmModule.forFeature([Alumno]), UtilsModule, UsuarioModule],
  controllers: [AlumnoController],
  providers: [AlumnoService, AlumnoRepository],
  exports: [AlumnoService],
})
export class AlumnoModule {}
