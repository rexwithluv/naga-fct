// src/config/global-config.ts

import { INestApplication, ValidationPipe } from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'
import { TypeOrmExceptionFilter } from '../common/filters/typeorm-exception.filter'

export function applyGlobalConfig(app: INestApplication) {
  const { httpAdapter } = app.get(HttpAdapterHost)

  app.useGlobalFilters(new TypeOrmExceptionFilter(httpAdapter))

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  )
}
