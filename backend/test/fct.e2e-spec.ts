import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import request from 'supertest'
import { App } from 'supertest/types'
import { AppModule } from '../src/app.module'
import { loginAsAdmin, loginAsStandard } from './auth-helpers'

describe('FctController (e2e)', () => {
  let app: INestApplication<App>
  const endpoint = '/fct'
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
      it('should return an array with FctResponseDto - admin', async () => {
        const response = await request(app.getHttpServer())
          .get(endpoint)
          .set('Authorization', `Bearer ${adminToken}`)
          .expect(200)

        expect(response.body).toBeInstanceOf(Array)

        const fct = response.body[0]

        expect(fct).toHaveProperty('id')
        expect(typeof fct.id).toBe('string')

        expect(fct).toHaveProperty('alumno')
        expect(typeof fct.alumno).toBe('object')
        expect(fct.alumno).toHaveProperty('id')
        expect(typeof fct.alumno.id).toBe('string')
        expect(fct.alumno).toHaveProperty('dniNie')
        expect(typeof fct.alumno.dniNie).toBe('string')
        expect(fct.alumno).toHaveProperty('nombre')
        expect(typeof fct.alumno.nombre).toBe('string')
        expect(fct.alumno).toHaveProperty('apellidos')
        expect(typeof fct.alumno.apellidos).toBe('string')
        expect(fct.alumno).toHaveProperty('email')
        expect(typeof fct.alumno.email).toBe('string')
        expect(fct.alumno).toHaveProperty('telefono')
        expect(typeof fct.alumno.telefono).toBe('string')
        expect(fct.alumno).toHaveProperty('numeroSeguridadSocial')
        expect(typeof fct.alumno.numeroSeguridadSocial).toBe('string')

        expect(fct).toHaveProperty('empresa')
        expect(typeof fct.empresa).toBe('object')
        expect(fct.empresa).toHaveProperty('id')
        expect(typeof fct.empresa.id).toBe('string')
        expect(fct.empresa).toHaveProperty('nombre')
        expect(typeof fct.empresa.nombre).toBe('string')
        expect(fct.empresa).toHaveProperty('direccion')
        expect(typeof fct.empresa.direccion).toBe('string')

        expect(fct).toHaveProperty('tutorEmpresa')
        expect(typeof fct.tutorEmpresa).toBe('object')
        expect(fct.tutorEmpresa).toHaveProperty('nombre')
        expect(typeof fct.tutorEmpresa.nombre).toBe('string')
        expect(fct.tutorEmpresa).toHaveProperty('apellidos')
        expect(typeof fct.tutorEmpresa.apellidos).toBe('string')
        expect(fct.tutorEmpresa).toHaveProperty('id')
        expect(typeof fct.tutorEmpresa.id).toBe('string')

        expect(fct).toHaveProperty('fechaInicio')
        expect(typeof fct.fechaInicio).toBe('string')

        expect(fct).toHaveProperty('fechaFin')
        expect(typeof fct.fechaFin).toBe('string')
      })

      it('should return an array without FctResponseDto - standard', async () => {
        const response = await request(app.getHttpServer())
          .get(endpoint)
          .set('Authorization', `Bearer ${standardToken}`)
          .expect(200)

        expect(response.body).toBeInstanceOf(Array)

        const fct = response.body[0]

        expect(fct).toHaveProperty('id')
        expect(typeof fct.id).toBe('string')

        expect(fct).toHaveProperty('alumno')
        expect(typeof fct.alumno).toBe('object')
        expect(fct.alumno).toHaveProperty('id')
        expect(typeof fct.alumno.id).toBe('string')
        expect(fct.alumno).toHaveProperty('dniNie')
        expect(typeof fct.alumno.dniNie).toBe('string')
        expect(fct.alumno).toHaveProperty('nombre')
        expect(typeof fct.alumno.nombre).toBe('string')
        expect(fct.alumno).toHaveProperty('apellidos')
        expect(typeof fct.alumno.apellidos).toBe('string')
        expect(fct.alumno).toHaveProperty('email')
        expect(typeof fct.alumno.email).toBe('string')
        expect(fct.alumno).toHaveProperty('telefono')
        expect(typeof fct.alumno.telefono).toBe('string')
        expect(fct.alumno).toHaveProperty('numeroSeguridadSocial')
        expect(typeof fct.alumno.numeroSeguridadSocial).toBe('string')

        expect(fct).toHaveProperty('empresa')
        expect(typeof fct.empresa).toBe('object')
        expect(fct.empresa).toHaveProperty('id')
        expect(typeof fct.empresa.id).toBe('string')
        expect(fct.empresa).toHaveProperty('nombre')
        expect(typeof fct.empresa.nombre).toBe('string')
        expect(fct.empresa).toHaveProperty('direccion')
        expect(typeof fct.empresa.direccion).toBe('string')

        expect(fct).toHaveProperty('tutorEmpresa')
        expect(typeof fct.tutorEmpresa).toBe('object')
        expect(fct.tutorEmpresa).toHaveProperty('nombre')
        expect(typeof fct.tutorEmpresa.nombre).toBe('string')
        expect(fct.tutorEmpresa).toHaveProperty('apellidos')
        expect(typeof fct.tutorEmpresa.apellidos).toBe('string')
        expect(fct.tutorEmpresa).toHaveProperty('id')
        expect(typeof fct.tutorEmpresa.id).toBe('string')

        expect(fct).toHaveProperty('fechaInicio')
        expect(typeof fct.fechaInicio).toBe('string')

        expect(fct).toHaveProperty('fechaFin')
        expect(typeof fct.fechaFin).toBe('string')
      })
    })
  })
})
