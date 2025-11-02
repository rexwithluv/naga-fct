import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
@Entity('concellos')
export class Concello {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number

  @Column({ length: 500, nullable: false })
  nombre: string
}
