import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique } from 'typeorm'
import { Curso } from '../curso/curso.entity'
import { Usuario } from '../usuario/usuario.entity'

@Entity('tutores_centro')
@Unique('idx_tutores_centro_email', ['email'])
export class TutorCentro {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number

  @Column({ nullable: false, length: 500 })
  nombre: string

  @Column({ nullable: false, length: 500 })
  apellidos: string

  @Column({ nullable: false, length: 500 })
  email: string

  @Column({ nullable: false })
  activo: boolean

  @OneToOne(() => Curso, { nullable: true })
  @JoinColumn({
    name: 'curso_id',
    foreignKeyConstraintName: 'fk_tutor_centro_curso',
  })
  curso: Curso

  @OneToOne(() => Usuario, { nullable: true })
  @JoinColumn({
    name: 'usuario_id',
    foreignKeyConstraintName: 'fk_tutor_centro_usuario_id',
  })
  usuario: Usuario
}
