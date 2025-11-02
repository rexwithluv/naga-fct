import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Concello } from '../concello/concello.entity'
import { Especialidad } from '../especialidad/especialidad.entity'
import { Skill } from '../skill/skill.entity'

@Entity('empresas')
export class Empresa {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number

  @Column({ nullable: false, length: 500 })
  nombre: string

  @ManyToOne(() => Concello, { nullable: false })
  @JoinColumn({ name: 'concello_id', foreignKeyConstraintName: 'fk_empresas_concello' })
  concello: Concello

  @Column({ nullable: false, length: 500 })
  direccion: string

  @Column({ nullable: true, type: 'text' })
  observaciones: string

  @ManyToOne(() => Especialidad, { nullable: false })
  @JoinColumn({ name: 'especialidad_id', foreignKeyConstraintName: 'fk_empresas_especialidad' })
  especialidad: Especialidad

  @Column({ nullable: true, length: 500 })
  contactoNombre: string

  @Column({ nullable: true, length: 500 })
  contactoEmail: string

  @Column({ nullable: true, length: 500 })
  contactoTelefono: string

  @Column({ nullable: false })
  activa: boolean

  @Column({ nullable: true, type: 'smallint', default: 0 })
  plazas: number

  @ManyToMany(() => Skill, (skill) => skill.empresas)
  @JoinTable({
    name: 'empresas_skills',
    joinColumn: { name: 'empresa_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'skill_id', referencedColumnName: 'id' },
  })
  skills: Skill[]
}
