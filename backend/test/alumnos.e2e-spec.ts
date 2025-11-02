import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import request from 'supertest'
import { App } from 'supertest/types'
import { AppModule } from '../src/app.module'

describe('AlumnosController (e2e)', () => {
  let app: INestApplication<App>

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('GET /alumnos (ADMIN)', async () => {
    const response = await request(app.getHttpServer()).get('/alumnos').expect(200)

    expect(response.body).toBeInstanceOf(Array)

    if (response.body.length > 0) {
      const alumno = response.body[0]

      expect(alumno).toHaveProperty('id')
      expect(alumno).toHaveProperty('dniNie')
      expect(alumno).toHaveProperty('nombre')
      expect(alumno).toHaveProperty('apellidos')
      expect(alumno).toHaveProperty('email')
      expect(alumno).toHaveProperty('telefono')
      expect(alumno).toHaveProperty('numeroSeguridadSocial')

      expect(alumno).toHaveProperty('concello')
      expect(alumno.concello).toHaveProperty('id')
      expect(alumno.concello).toHaveProperty('nombre')

      expect(alumno).toHaveProperty('estado')
      expect(alumno.estado).toHaveProperty('id')
      expect(alumno.estado).toHaveProperty('nombre')

      expect(alumno).toHaveProperty('tutorCentro')
      expect(alumno.tutorCentro).toHaveProperty('id')
      expect(alumno.tutorCentro).toHaveProperty('nombre')
      expect(alumno.tutorCentro).toHaveProperty('curso')
    }
  })

  it('GET /alumnos', async () => {
    const response = await request(app.getHttpServer()).get('/alumnos').expect(200)

    expect(response.body).toBeInstanceOf(Array)

    if (response.body.length > 0) {
      const alumno = response.body[0]

      expect(alumno).toHaveProperty('id')
      expect(alumno).toHaveProperty('dniNie')
      expect(alumno).toHaveProperty('nombre')
      expect(alumno).toHaveProperty('apellidos')
      expect(alumno).toHaveProperty('email')
      expect(alumno).toHaveProperty('telefono')
      expect(alumno).toHaveProperty('numeroSeguridadSocial')

      expect(alumno).toHaveProperty('concello')
      expect(alumno.concello).toHaveProperty('id')
      expect(alumno.concello).toHaveProperty('nombre')

      expect(alumno).toHaveProperty('estado')
      expect(alumno.estado).toHaveProperty('id')
      expect(alumno.estado).toHaveProperty('nombre')
    }
  })
})
