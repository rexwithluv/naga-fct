import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { Usuario } from '../usuario/usuario.entity'
import { UsuarioService } from '../usuario/usuario.service'
import { UsuarioPayloadDto } from './dto/usuario-payload.dto'

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async validateUsuario(email: string, pass: string): Promise<any> {
    const usuario = await this.usuarioService.findByEmail(email)

    if (!usuario) {
      throw new UnauthorizedException('Credenciales inválidas')
    }

    const isMatch = await bcrypt.compare(pass, usuario.password)

    if (isMatch && usuario.activo) {
      const { password, ...result } = usuario
      return result
    }

    throw new UnauthorizedException('Credenciales inválidas o usuario inactivo')
  }

  async login(user: Usuario) {
    const payload: UsuarioPayloadDto = {
      id: user.id,
      email: user.email,
      rol: user.rol.nombre,
    }

    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
