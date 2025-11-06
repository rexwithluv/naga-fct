import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import request from 'supertest'
import { App } from 'supertest/types'
import { AppModule } from '../src/app.module'
import { loginAsAdmin, loginAsStandard } from './auth-helpers'

describe('EstadoAlumnoController (e2e)', () => {
  let app: INestApplication<App>
  const endpoint = '/estados-alumno'
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

  describe(`GET ${endpoint}`, () => {
    describe('Authorization', () => {
      it('should return 200 - admin', () => {
        return request(app.getHttpServer())
          .get(endpoint)
          .set('Authorization', `Bearer ${adminToken}`)
          .expect(200)
      })

      it('should return 200 - standard', () => {
        return request(app.getHttpServer())
          .get(endpoint)
          .set('Authorization', `Bearer ${standardToken}`)
          .expect(200)
      })

      it('should return 401 - without token', () => {
        return request(app.getHttpServer()).get(endpoint).expect(401)
      })
    })

    describe('Response', () => {
      it('should return an array with EstadoAlumnoResponseDto - admin', async () => {
        const response = await request(app.getHttpServer())
          .get(endpoint)
          .set('Authorization', `Bearer ${adminToken}`)
          .expect(200)

        expect(response.body).toBeInstanceOf(Array)

        const estadoAlumno = response.body[0]

        expect(estadoAlumno).toHaveProperty('id')
        expect(typeof estadoAlumno.id).toBe('string')

        expect(estadoAlumno).toHaveProperty('nombre')
        expect(typeof estadoAlumno.nombre).toBe('string')
      })
      it('should return an array with EstadoAlumnoResponseDto - standard', async () => {
        const response = await request(app.getHttpServer())
          .get(endpoint)
          .set('Authorization', `Bearer ${standardToken}`)
          .expect(200)

        expect(response.body).toBeInstanceOf(Array)

        const estadoAlumno = response.body[0]

        expect(estadoAlumno).toHaveProperty('id')
        expect(typeof estadoAlumno.id).toBe('string')

        expect(estadoAlumno).toHaveProperty('nombre')
        expect(typeof estadoAlumno.nombre).toBe('string')
      })
    })
  })
})
