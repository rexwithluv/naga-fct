import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('estados_alumno')
export class EstadoAlumno {
  @PrimaryGeneratedColumn({ type: 'tinyint' })
  id: number

  @Column({ nullable: false, length: 500 })
  nombre: string
}
