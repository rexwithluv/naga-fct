import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('especialidades')
export class Especialidad {
  @PrimaryGeneratedColumn({ type: 'tinyint' })
  id: number

  @Column({ nullable: false, length: 500 })
  nombre: string
}
