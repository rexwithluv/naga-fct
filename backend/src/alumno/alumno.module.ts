import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UtilsModule } from '../utils/utils.module'
import { AlumnoController } from './alumno.controller'
import { Alumno } from './alumno.entity'
import { AlumnoService } from './alumno.service'

@Module({
  imports: [TypeOrmModule.forFeature([Alumno]), UtilsModule],
  controllers: [AlumnoController],
  providers: [AlumnoService],
  exports: [AlumnoService],
})
export class AlumnoModule {}
