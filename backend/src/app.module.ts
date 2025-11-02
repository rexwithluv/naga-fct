import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AlumnoModule } from './alumno/alumno.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { ConcelloModule } from './concello/concello.module'
import { CorreoModule } from './correo/correo.module'
import { CursoModule } from './curso/curso.module'
import { EmpresaModule } from './empresa/empresa.module'
import { EspecialidadModule } from './especialidad/especialidad.module'
import { EstadoAlumnoModule } from './estado-alumno/estado-alumno.module'
import { FctModule } from './fct/fct.module'
import { RolUsuarioModule } from './rol-usuario/rol-usuario.module'
import { SkillModule } from './skill/skill.module'
import { TutorCentroModule } from './tutor-centro/tutor-centro.module'
import { TutorEmpresaModule } from './tutor-empresa/tutor-empresa.module'
import { UsuarioModule } from './usuario/usuario.module'

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: '127.0.0.1',
      port: 3306,
      username: 'user',
      password: 'abc123.',
      database: 'naga-fct',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
      logging: 'all',
    }),
    AlumnoModule,
    ConcelloModule,
    EstadoAlumnoModule,
    TutorCentroModule,
    CorreoModule,
    CursoModule,
    EspecialidadModule,
    FctModule,
    RolUsuarioModule,
    SkillModule,
    UsuarioModule,
    TutorEmpresaModule,
    EmpresaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
