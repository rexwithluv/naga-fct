import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Empresa } from '../empresa/empresa.entity'
import { Usuario } from '../usuario/usuario.entity'
@Entity('correos')
export class Correo {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number

  @Column({ type: 'date', nullable: false })
  fecha: string | Date

  @ManyToOne(() => Usuario, { nullable: false })
  @JoinColumn({
    name: 'usuario_id',
    foreignKeyConstraintName: 'fk_correos_usuario',
  })
  usuario: Usuario

  @ManyToOne(() => Empresa, { nullable: false })
  @JoinColumn({
    name: 'empresa_id',
    foreignKeyConstraintName: 'fk_correos_empresa',
  })
  empresa: Empresa

  @Column({ name: 'curso_academico', length: 50, nullable: false })
  cursoAcademico: string
}
