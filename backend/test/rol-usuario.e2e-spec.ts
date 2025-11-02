import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import request from 'supertest'
import { App } from 'supertest/types'
import { AppModule } from '../src/app.module'
import { loginAsAdmin, loginAsStandard } from './auth-helpers'

describe('RolUsuarioController (e2e)', () => {
  let app: INestApplication<App>
  const endpoint = '/roles-usuario'
  let adminToken: string
  let standardToken: string

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()

    adminToken = await loginAsAdmin(app)
    standardToken = await loginAsStandard(app)
  })

  afterAll(async () => {
    await app.close()
  })

  describe('GET /roles-usuario', () => {
    it('GET /usuarios (ADMIN)', async () => {
      const response = await request(app.getHttpServer())
        .get(endpoint)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200)

      expect(response.body).toBeInstanceOf(Array)

      const role = response.body[0]

      expect(role).toHaveProperty('id')
      expect(typeof role.id).toBe('string')

      expect(role).toHaveProperty('nombre')
      expect(typeof role.nombre).toBe('string')
    })

    it('GET /usuarios (STANDARD)', () => {
      return request(app.getHttpServer())
        .get(endpoint)
        .set('Authorization', `Bearer ${standardToken}`)
        .expect(403)
    })

    it('GET /usuarios (without token)', () => {
      return request(app.getHttpServer()).get(endpoint).expect(401)
    })
  })
})
