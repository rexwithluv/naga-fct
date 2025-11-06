import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import request from 'supertest'
import { App } from 'supertest/types'
import { AppModule } from '../src/app.module'
import { loginAsAdmin, loginAsStandard } from './auth-helpers'

describe('TutorEmpresaController (e2e)', () => {
  let app: INestApplication<App>
  const endpoint = '/tutores-empresa'
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
      it('should return an array with TutorEmpresaResponseDto - admin', async () => {
        const response = await request(app.getHttpServer())
          .get(endpoint)
          .set('Authorization', `Bearer ${adminToken}`)
          .expect(200)

        expect(response.body).toBeInstanceOf(Array)

        const tutorEmpresa = response.body[0]

        expect(tutorEmpresa).toHaveProperty('id')
        expect(typeof tutorEmpresa.id).toBe('string')

        expect(tutorEmpresa).toHaveProperty('empresa')
        expect(typeof tutorEmpresa.empresa).toBe('object')
        expect(tutorEmpresa.empresa).toHaveProperty('id')
        expect(typeof tutorEmpresa.empresa.id).toBe('string')
        expect(tutorEmpresa.empresa).toHaveProperty('nombre')
        expect(typeof tutorEmpresa.empresa.nombre).toBe('string')

        expect(tutorEmpresa).toHaveProperty('nombre')
        expect(typeof tutorEmpresa.nombre).toBe('string')

        expect(tutorEmpresa).toHaveProperty('apellidos')
        expect(typeof tutorEmpresa.apellidos).toBe('string')

        expect(tutorEmpresa).toHaveProperty('email')
        expect(typeof tutorEmpresa.email).toBe('string')

        expect(tutorEmpresa).toHaveProperty('telefono')
        expect(typeof tutorEmpresa.telefono).toBe('string')
      })

      it('should return an array without especialidad - standard', async () => {
        const response = await request(app.getHttpServer())
          .get(endpoint)
          .set('Authorization', `Bearer ${standardToken}`)
          .expect(200)

        expect(response.body).toBeInstanceOf(Array)

        const tutorEmpresa = response.body[0]

        expect(tutorEmpresa).toHaveProperty('id')
        expect(typeof tutorEmpresa.id).toBe('string')

        expect(tutorEmpresa).toHaveProperty('empresa')
        expect(typeof tutorEmpresa.empresa).toBe('object')
        expect(tutorEmpresa.empresa).toHaveProperty('id')
        expect(typeof tutorEmpresa.empresa.id).toBe('string')
        expect(tutorEmpresa.empresa).toHaveProperty('nombre')
        expect(typeof tutorEmpresa.empresa.nombre).toBe('string')

        expect(tutorEmpresa).toHaveProperty('nombre')
        expect(typeof tutorEmpresa.nombre).toBe('string')

        expect(tutorEmpresa).toHaveProperty('apellidos')
        expect(typeof tutorEmpresa.apellidos).toBe('string')

        expect(tutorEmpresa).toHaveProperty('email')
        expect(typeof tutorEmpresa.email).toBe('string')

        expect(tutorEmpresa).toHaveProperty('telefono')
        expect(typeof tutorEmpresa.telefono).toBe('string')
      })
    })
  })
})
