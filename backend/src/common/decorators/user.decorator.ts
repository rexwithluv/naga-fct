import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { Request } from 'express'
import { JwtPayloadDto } from '../../auth/dto/jwt-payload.dto'

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<Request>()

  const user = request.user as JwtPayloadDto

  return data ? user?.[data as keyof JwtPayloadDto] : user
})
