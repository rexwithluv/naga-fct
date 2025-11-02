import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Alumno } from '../alumno/alumno.entity'
import { TutorEmpresa } from '../tutor-empresa/tutor-empresa.entity'

@Entity('fct')
export class FCT {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number

  @ManyToOne(() => Alumno, { nullable: false })
  @JoinColumn({
    name: 'alumno_id',
    foreignKeyConstraintName: 'fk_fct_alumno',
  })
  alumno: Alumno

  @ManyToOne(() => TutorEmpresa, { nullable: false })
  @JoinColumn({
    name: 'tutor_empresa_id',
    foreignKeyConstraintName: 'fk_fct_tutor_empresa_id',
  })
  tutorEmpresa: TutorEmpresa

  @Column({ name: 'fecha_inicio', type: 'date', nullable: false })
  fechaInicio: string | Date

  @Column({ name: 'fecha_fin', type: 'date', nullable: true })
  fechaFin: string | Date
}
