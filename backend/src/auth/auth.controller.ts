import { Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Public } from '../common/decorators/public.decorator'
import { User } from '../common/decorators/user.decorator'
import { Usuario } from '../usuario/usuario.entity'
import { AuthService } from './auth.service'

@Controller('login')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(AuthGuard('local'))
  @Post()
  @HttpCode(HttpStatus.OK)
  async login(@User() user: Usuario) {
    return this.authService.login(user)
  }
}
