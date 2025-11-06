import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import request from 'supertest'
import { App } from 'supertest/types'
import { AppModule } from '../src/app.module'
import { EspecialidadResponseDto } from '../src/especialidad/dto/especialidad-response.dto'
import { loginAsAdmin, loginAsStandard } from './auth-helpers'

describe('ConcelloController (e2e)', () => {
  let app: INestApplication<App>
  const endpoint = '/concellos'
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

  describe('GET /concellos', () => {
    describe('Authorization', () => {
      it('should return 200', () => {
        return request(app.getHttpServer())
          .get(endpoint)
          .set('Authorization', `Bearer ${adminToken}`)
          .expect(200)
      })

      it('should return 200', () => {
        return request(app.getHttpServer())
          .get(endpoint)
          .set('Authorization', `Bearer ${standardToken}`)
          .expect(200)
      })

      it('should return 401', () => {
        return request(app.getHttpServer()).get(endpoint).expect(401)
      })
    })

    describe('Response', () => {
      it('should return an array with id and nombre - admin', async () => {
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

      it('should return an array with id and nombre - standard', async () => {
        const response = await request(app.getHttpServer())
          .get(endpoint)
          .set('Authorization', `Bearer ${standardToken}`)
          .expect(200)

        expect(response.body).toBeInstanceOf(Array)

        const role = response.body[0]

        expect(role).toHaveProperty('id')
        expect(typeof role.id).toBe('string')

        expect(role).toHaveProperty('nombre')
        expect(typeof role.nombre).toBe('string')
      })
    })

    describe('Filters', () => {
      const filterEndpoint = `${endpoint}?nombre=Tui`
      it('should return an array where all the names start with "Tui" - admin', async () => {
        const response = await request(app.getHttpServer())
          .get(filterEndpoint)
          .set('Authorization', `Bearer ${adminToken}`)
          .expect(200)

        expect(
          response.body.every((c: EspecialidadResponseDto) => c.nombre.startsWith('Tui')),
        ).toBe(true)
      })

      it('should return an array where all the names start with "Tui" - standard', async () => {
        const response = await request(app.getHttpServer())
          .get(filterEndpoint)
          .set('Authorization', `Bearer ${standardToken}`)
          .expect(200)

        expect(
          response.body.every((c: EspecialidadResponseDto) => c.nombre.startsWith('Tui')),
        ).toBe(true)
      })
    })
  })
})
