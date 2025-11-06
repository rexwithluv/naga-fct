import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EstadoAlumnoController } from './estado-alumno.controller'
import { EstadoAlumno } from './estado-alumno.entity'
import { EstadoAlumnoService } from './estado-alumno.service'

@Module({
  imports: [TypeOrmModule.forFeature([EstadoAlumno])],
  controllers: [EstadoAlumnoController],
  providers: [EstadoAlumnoService],
  exports: [EstadoAlumnoService],
})
export class EstadoAlumnoModule {}
