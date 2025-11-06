import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm'
import { Concello } from '../concello/concello.entity'
import { EstadoAlumno } from '../estado-alumno/estado-alumno.entity'
import { TutorCentro } from '../tutor-centro/tutor-centro.entity'
@Entity('alumnos')
@Unique('idx_alumnos_dni_nie', ['dniNie'])
@Unique('idx_alumnos_numero_seguridad_social', ['numeroSeguridadSocial'])
export class Alumno {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'dni_nie', nullable: true, length: 500 })
  dniNie: string

  @Column({ nullable: false, length: 500 })
  nombre: string

  @Column({ nullable: false, length: 500 })
  apellidos: string

  @Column({ nullable: false, length: 500 })
  email: string

  @Column({ nullable: false, length: 500 })
  telefono: string

  @Column({ name: 'numero_seguridad_social', nullable: true, length: 500 })
  numeroSeguridadSocial: string

  @ManyToOne(() => Concello, { nullable: false })
  @JoinColumn({
    name: 'concello_id',
    foreignKeyConstraintName: 'fk_alumnos_concellos',
  })
  concello: Concello

  @ManyToOne(() => EstadoAlumno, { nullable: false })
  @JoinColumn({ name: 'estado_id', foreignKeyConstraintName: 'fk_alumnos_estado_alumnos' })
  estadoAlumno: EstadoAlumno

  @ManyToOne(() => TutorCentro, { nullable: false })
  @JoinColumn({ name: 'tutor_centro_id', foreignKeyConstraintName: 'fk_alumnos_tutor_centro' })
  tutorCentro: TutorCentro
}
