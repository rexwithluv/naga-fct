import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TutorCentroController } from './tutor-centro.controller'
import { TutorCentro } from './tutor-centro.entity'
import { TutorCentroRepository } from './tutor-centro.repository'
import { TutorCentroService } from './tutor-centro.service'

@Module({
  imports: [TypeOrmModule.forFeature([TutorCentro])],
  controllers: [TutorCentroController],
  providers: [TutorCentroService, TutorCentroRepository],
  exports: [TutorCentroService],
})
export class TutorCentroModule {}
