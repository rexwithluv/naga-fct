import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common'
import { EntityNotFoundError } from 'typeorm'

@Catch(EntityNotFoundError)
export class TypeOrmExceptionFilter implements ExceptionFilter {
  constructor(private readonly applicationRef?: any) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()

    if (exception instanceof EntityNotFoundError) {
      return response.status(HttpStatus.NOT_FOUND).json({
        statusCode: HttpStatus.NOT_FOUND,
        messsage: 'Recurso no encontrado. La entidad solicitada no existe.',
        error: 'Not found',
      })
    }

    throw exception
  }
}
