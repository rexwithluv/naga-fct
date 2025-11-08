import request from 'supertest'

describe('AlumnoController (e2e)', () => {
  const baseEndpoint = '/tutores-centro'

  const expectedTutorCentroStructure = {
    id: expect.any(String),
    nombre: expect.any(String),
    apellidos: expect.any(String),
    email: expect.any(String),
    activo: expect.any(Boolean),

    curso: {
      id: expect.any(String),
      nombre: expect.any(String),
      codigo: expect.any(String),
    },
    usuario: {
      id: expect.any(String),
      email: expect.any(String),
      activo: expect.any(Boolean),
    },
  }

  describe(`GET ${baseEndpoint}`, () => {
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
        expect(tutorCentro).toEqual(expectedTutorCentroStructure)
      })
    })
  })
})
