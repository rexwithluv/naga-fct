import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import request from 'supertest'
import { App } from 'supertest/types'
import { AppModule } from '../src/app.module'
import { loginAsAdmin, loginAsStandard } from './auth-helpers'

describe('AlumnoController (e2e)', () => {
  let app: INestApplication<App>
  const baseEndpoint = '/alumnos'
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

  describe('GET /alumnos', () => {
    describe('Authorization', () => {
      it('should return 200 - admin', () => {
        return request(app.getHttpServer())
          .get(baseEndpoint)
          .set('Authorization', `Bearer ${adminToken}`)
          .expect(200)
      })

      it('should return 200 - standard', () => {
        return request(app.getHttpServer())
          .get(baseEndpoint)
          .set('Authorization', `Bearer ${standardToken}`)
          .expect(200)
      })

      it('should return 401', () => {
        return request(app.getHttpServer()).get(baseEndpoint).expect(401)
      })
    })
    describe('Response', () => {
      it('should an array with tutorCentro field', async () => {
        const response = await request(app.getHttpServer())
          .get(baseEndpoint)
          .set('Authorization', `Bearer ${adminToken}`)
          .expect(200)

        expect(response.body).toBeInstanceOf(Array)

        const alumno = response.body[0]

        expect(alumno).toHaveProperty('id')
        expect(typeof alumno.id).toBe('string')

        expect(alumno).toHaveProperty('dniNie')
        expect(typeof alumno.dniNie).toBe('string')

        expect(alumno).toHaveProperty('nombre')
        expect(typeof alumno.nombre).toBe('string')

        expect(alumno).toHaveProperty('apellidos')
        expect(typeof alumno.apellidos).toBe('string')

        expect(alumno).toHaveProperty('email')
        expect(typeof alumno.email).toBe('string')

        expect(alumno).toHaveProperty('telefono')
        expect(typeof alumno.telefono).toBe('string')

        expect(alumno).toHaveProperty('concello')
        expect(typeof alumno.concello).toBe('object')
        expect(alumno.concello).toHaveProperty('id')
        expect(typeof alumno.concello.id).toBe('string')
        expect(alumno.concello).toHaveProperty('nombre')
        expect(typeof alumno.concello.nombre).toBe('string')

        expect(alumno).toHaveProperty('numeroSeguridadSocial')
        expect(typeof alumno.numeroSeguridadSocial).toBe('string')

        expect(alumno).toHaveProperty('estado')
        expect(typeof alumno.estado).toBe('string')
        expect(alumno.estado).toHaveProperty('id')
        expect(typeof alumno.estado.id).toBe('string')
        expect(alumno.estado).toHaveProperty('nombre')
        expect(typeof alumno.estado.nombre).toBe('string')

        expect(alumno).toHaveProperty('tutorCentro')
        expect(typeof alumno.tutorCentro).toBe('string')
        expect(alumno.tutorCentro).toHaveProperty('id')
        expect(typeof alumno.tutorCentro.id).toBe('string')
        expect(alumno.tutorCentro).toHaveProperty('nombre')
        expect(typeof alumno.tutorCentro.nombre).toBe('string')
        expect(alumno.tutorCentro).toHaveProperty('curso')
        expect(typeof alumno.tutorCentro.curso).toBe('string')
      })
      it('should an array without tutorCentro field', async () => {
        const response = await request(app.getHttpServer())
          .get(baseEndpoint)
          .set('Authorization', `Bearer ${standardToken}`)
          .expect(200)

        expect(response.body).toBeInstanceOf(Array)

        const alumno = response.body[0]

        expect(alumno).toHaveProperty('id')
        expect(typeof alumno.id).toBe('string')

        expect(alumno).toHaveProperty('dniNie')
        expect(typeof alumno.dniNie).toBe('string')

        expect(alumno).toHaveProperty('nombre')
        expect(typeof alumno.nombre).toBe('string')

        expect(alumno).toHaveProperty('apellidos')
        expect(typeof alumno.apellidos).toBe('string')

        expect(alumno).toHaveProperty('email')
        expect(typeof alumno.email).toBe('string')

        expect(alumno).toHaveProperty('telefono')
        expect(typeof alumno.telefono).toBe('string')

        expect(alumno).toHaveProperty('concello')
        expect(typeof alumno.concello).toBe('object')
        expect(alumno.concello).toHaveProperty('id')
        expect(typeof alumno.concello.id).toBe('string')
        expect(alumno.concello).toHaveProperty('nombre')
        expect(typeof alumno.concello.nombre).toBe('string')

        expect(alumno).toHaveProperty('numeroSeguridadSocial')
        expect(typeof alumno.numeroSeguridadSocial).toBe('string')

        expect(alumno).toHaveProperty('estado')
        expect(typeof alumno.estado).toBe('string')
        expect(alumno.estado).toHaveProperty('id')
        expect(typeof alumno.estado.id).toBe('string')
        expect(alumno.estado).toHaveProperty('nombre')
        expect(typeof alumno.estado.nombre).toBe('string')

        expect(alumno).not.toHaveProperty('tutorCentro')
      })
    })
  })

  describe('GET /alumnos/:id', () => {
    const endpoint = `${baseEndpoint}/1`

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

      it('should return 401', () => {
        return request(app.getHttpServer()).get(endpoint).expect(401)
      })
    })
    describe('Response', () => {
      it('should return an AlumnoResponseDto with tutorCentro field', async () => {
        const response = await request(app.getHttpServer())
          .get(endpoint)
          .set('Authorization', `Bearer ${adminToken}`)
          .expect(200)

        const alumno = response.body

        expect(alumno).toHaveProperty('id')
        expect(typeof alumno.id).toBe('string')

        expect(alumno).toHaveProperty('dniNie')
        expect(typeof alumno.dniNie).toBe('string')

        expect(alumno).toHaveProperty('nombre')
        expect(typeof alumno.nombre).toBe('string')

        expect(alumno).toHaveProperty('apellidos')
        expect(typeof alumno.apellidos).toBe('string')

        expect(alumno).toHaveProperty('email')
        expect(typeof alumno.email).toBe('string')

        expect(alumno).toHaveProperty('telefono')
        expect(typeof alumno.telefono).toBe('string')

        expect(alumno).toHaveProperty('concello')
        expect(typeof alumno.concello).toBe('object')
        expect(alumno.concello).toHaveProperty('id')
        expect(typeof alumno.concello.id).toBe('string')
        expect(alumno.concello).toHaveProperty('nombre')
        expect(typeof alumno.concello.nombre).toBe('string')

        expect(alumno).toHaveProperty('numeroSeguridadSocial')
        expect(typeof alumno.numeroSeguridadSocial).toBe('string')

        expect(alumno).toHaveProperty('estado')
        expect(typeof alumno.estado).toBe('string')
        expect(alumno.estado).toHaveProperty('id')
        expect(typeof alumno.estado.id).toBe('string')
        expect(alumno.estado).toHaveProperty('nombre')
        expect(typeof alumno.estado.nombre).toBe('string')

        expect(alumno).toHaveProperty('tutorCentro')
        expect(typeof alumno.tutorCentro).toBe('string')
        expect(alumno.tutorCentro).toHaveProperty('id')
        expect(typeof alumno.tutorCentro.id).toBe('string')
        expect(alumno.tutorCentro).toHaveProperty('nombre')
        expect(typeof alumno.tutorCentro.nombre).toBe('string')
        expect(alumno.tutorCentro).toHaveProperty('curso')
        expect(typeof alumno.tutorCentro.curso).toBe('string')
      })
      it('should return an AlumnoResponseDto without tutorCentro field', async () => {
        const response = await request(app.getHttpServer())
          .get(endpoint)
          .set('Authorization', `Bearer ${standardToken}`)
          .expect(200)

        const alumno = response.body

        expect(alumno).toHaveProperty('id')
        expect(typeof alumno.id).toBe('string')

        expect(alumno).toHaveProperty('dniNie')
        expect(typeof alumno.dniNie).toBe('string')

        expect(alumno).toHaveProperty('nombre')
        expect(typeof alumno.nombre).toBe('string')

        expect(alumno).toHaveProperty('apellidos')
        expect(typeof alumno.apellidos).toBe('string')

        expect(alumno).toHaveProperty('email')
        expect(typeof alumno.email).toBe('string')

        expect(alumno).toHaveProperty('telefono')
        expect(typeof alumno.telefono).toBe('string')

        expect(alumno).toHaveProperty('concello')
        expect(typeof alumno.concello).toBe('object')
        expect(alumno.concello).toHaveProperty('id')
        expect(typeof alumno.concello.id).toBe('string')
        expect(alumno.concello).toHaveProperty('nombre')
        expect(typeof alumno.concello.nombre).toBe('string')

        expect(alumno).toHaveProperty('numeroSeguridadSocial')
        expect(typeof alumno.numeroSeguridadSocial).toBe('string')

        expect(alumno).toHaveProperty('estado')
        expect(typeof alumno.estado).toBe('string')
        expect(alumno.estado).toHaveProperty('id')
        expect(typeof alumno.estado.id).toBe('string')
        expect(alumno.estado).toHaveProperty('nombre')
        expect(typeof alumno.estado.nombre).toBe('string')

        expect(alumno).not.toHaveProperty('tutorCentro')
      })
    })
    describe('Errors', () => {
      const forbiddenEndpoint = endpoint
      const notFoundEndpoint = `${baseEndpoint}/9999`

      it('should return 403, standard user dont see others alumnos', async () => {
        return request(app.getHttpServer())
          .get(forbiddenEndpoint)
          .set('Authorization', `Bearer ${standardToken}`)
          .expect(403)
      })
      it('should return 404', () => {
        return request(app.getHttpServer())
          .get(notFoundEndpoint)
          .set('Authorization', `Bearer ${standardToken}`)
          .expect(404)
      })
    })
  })
})
