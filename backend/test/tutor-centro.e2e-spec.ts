import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import request from 'supertest'
import { App } from 'supertest/types'
import { AppModule } from '../src/app.module'
import { loginAsAdmin, loginAsStandard } from './auth-helpers'

describe('AlumnoController (e2e)', () => {
  let app: INestApplication<App>
  const baseEndpoint = '/tutores-centro'
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

  describe('GET /tutores-centro', () => {
    describe('Authorization', () => {
      it('should return 200 - admin', () => {
        return request(app.getHttpServer())
          .get(baseEndpoint)
          .set('Authorization', `Bearer ${adminToken}`)
          .expect(200)
      })

      it('should return 403 - standard', () => {
        return request(app.getHttpServer())
          .get(baseEndpoint)
          .set('Authorization', `Bearer ${standardToken}`)
          .expect(403)
      })

      it('should return 401 - without token', () => {
        return request(app.getHttpServer()).get(baseEndpoint).expect(401)
      })
    })
    describe('Response', () => {
      it('should an array with TutorCentroResponseDto', async () => {
        const response = await request(app.getHttpServer())
          .get(baseEndpoint)
          .set('Authorization', `Bearer ${adminToken}`)
          .expect(200)

        expect(response.body).toBeInstanceOf(Array)

        const tutorCentro = response.body[0]

        expect(tutorCentro).toHaveProperty('id')
        expect(typeof tutorCentro.id).toBe('string')

        expect(tutorCentro).toHaveProperty('nombre')
        expect(typeof tutorCentro.nombre).toBe('string')

        expect(tutorCentro).toHaveProperty('apellidos')
        expect(typeof tutorCentro.apellidos).toBe('string')

        expect(tutorCentro).toHaveProperty('email')
        expect(typeof tutorCentro.email).toBe('string')

        expect(tutorCentro).toHaveProperty('curso')
        expect(typeof tutorCentro.curso).toBe('object')
        expect(tutorCentro.curso).toHaveProperty('id')
        expect(typeof tutorCentro.curso.id).toBe('string')
        expect(tutorCentro.curso).toHaveProperty('nombre')
        expect(typeof tutorCentro.curso.nombre).toBe('string')

        expect(tutorCentro).toHaveProperty('activo')
        expect(typeof tutorCentro.activo).toBe('boolean')

        expect(tutorCentro).toHaveProperty('usuario')
        expect(typeof tutorCentro.usuario).toBe('object')
        expect(tutorCentro.usuario).toHaveProperty('id')
        expect(typeof tutorCentro.usuario.id).toBe('string')
        expect(tutorCentro.usuario).toHaveProperty('email')
        expect(typeof tutorCentro.usuario.email).toBe('string')
      })
    })
  })
})
