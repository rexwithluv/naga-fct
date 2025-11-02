import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Empresa } from '../empresa/empresa.entity'
import { Especialidad } from '../especialidad/especialidad.entity'

@Entity('skills')
export class Skill {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number

  @Column({ nullable: false, length: 500 })
  nombre: string

  @ManyToOne(() => Especialidad, { nullable: false })
  @JoinColumn({
    name: 'especialidad_id',
    foreignKeyConstraintName: 'fk_skills_especialidad',
  })
  especialidad: Especialidad

  @ManyToMany(() => Empresa, (empresa) => empresa.skills)
  empresas: Empresa[]
}
