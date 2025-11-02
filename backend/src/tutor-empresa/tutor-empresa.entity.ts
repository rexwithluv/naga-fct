import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Empresa } from '../empresa/empresa.entity'

@Entity('tutores_empresa')
export class TutorEmpresa {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number

  @ManyToOne(() => Empresa, { nullable: false })
  @JoinColumn({
    name: 'empresa_id',
    foreignKeyConstraintName: 'fk_tutores_empresa',
  })
  empresa: Empresa

  @Column({ nullable: false, length: 500 })
  nombre: string

  @Column({ nullable: false, length: 500 })
  apellidos: string

  @Column({ nullable: false, length: 500 })
  email: string

  @Column({ nullable: false, length: 500 })
  telefono: string
}
