import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsuarioModule } from '../usuario/usuario.module'
import { UtilsModule } from '../utils/utils.module'
import { SkillController } from './skill.controller'
import { Skill } from './skill.entity'
import { SkillService } from './skill.service'

@Module({
  imports: [TypeOrmModule.forFeature([Skill]), UtilsModule, UsuarioModule],
  controllers: [SkillController],
  providers: [SkillService],
  exports: [SkillService],
})
export class SkillModule {}
