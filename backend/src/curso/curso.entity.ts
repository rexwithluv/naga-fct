import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm'
import { Especialidad } from '../especialidad/especialidad.entity'
import { TutorCentro } from '../tutor-centro/tutor-centro.entity'

@Entity('cursos')
@Unique('idx_cursos_codigo', ['codigo'])
export class Curso {
  @PrimaryGeneratedColumn({ type: 'smallint' })
  id: number

  @Column({ name: 'codigo', length: 20, nullable: false })
  codigo: string

  @Column({ nullable: false, length: 500 })
  nombre: string

  @ManyToOne(() => Especialidad, { nullable: false })
  @JoinColumn({
    name: 'especialidad_id',
    foreignKeyConstraintName: 'fk_cursos_especialidad',
  })
  especialidad: Especialidad

  @OneToOne(() => TutorCentro, (tutorCentro) => tutorCentro.curso)
  tutorCentro: TutorCentro
}
