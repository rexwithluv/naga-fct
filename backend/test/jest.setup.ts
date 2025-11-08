import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { App } from 'supertest/types'
import { AppModule } from '../src/app.module'
import { applyGlobalConfig } from '../src/config/global-config'
import { loginAsAdmin, loginAsStandard } from './e2e-helpers'

declare global {
  let app: INestApplication<App>
  let adminToken: string
  let standardToken: string
}

beforeAll(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile()

  app = moduleFixture.createNestApplication()

  applyGlobalConfig(app)

  await app.init()

  adminToken = await loginAsAdmin(app)
  standardToken = await loginAsStandard(app)
})

afterAll(async () => {
  await app.close()
})
