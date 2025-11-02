import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { Request } from 'express'
import { UsuarioPayloadDto } from '../../auth/dto/usuario-payload.dto'

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<Request>()

  const user = request.user as UsuarioPayloadDto

  return data ? user?.[data as keyof UsuarioPayloadDto] : user
})
