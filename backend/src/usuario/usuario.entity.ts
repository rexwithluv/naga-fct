import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm'
import { RolUsuario } from '../rol-usuario/rol-usuario.entity'
import { TutorCentro } from '../tutor-centro/tutor-centro.entity'

@Entity('usuarios')
@Unique('idx_usuarios_email', ['email'])
export class Usuario {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number

  @Column({ nullable: false, length: 500 })
  email: string

  @Column({ nullable: false, length: 500 })
  password: string

  @Column({ nullable: false })
  activo: boolean

  @ManyToOne(() => RolUsuario, { nullable: false })
  @JoinColumn({ name: 'rol_id', foreignKeyConstraintName: 'fk_usuarios_rol' })
  rol: RolUsuario

  @OneToOne(() => TutorCentro, (tutorCentro) => tutorCentro.usuario)
  tutorCentro: TutorCentro
}
