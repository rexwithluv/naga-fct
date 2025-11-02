import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('roles_usuario')
export class RolUsuario {
  @PrimaryGeneratedColumn({ type: 'tinyint' })
  id: number

  @Column({ nullable: false, length: 500 })
  nombre: string
}
