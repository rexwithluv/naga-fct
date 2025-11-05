import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './app.module'
import { TypeOrmExceptionFilter } from './common/filters/typeorm-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const { httpAdapter } = app.get(HttpAdapterHost)

  app.useGlobalFilters(new TypeOrmExceptionFilter(httpAdapter))
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    }),
  )

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
