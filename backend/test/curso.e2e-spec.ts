import request from 'supertest'

describe('CursoController (e2e)', () => {
  const baseEndpoint = '/cursos'

  const expectedCursoStructure = {
    id: expect.any(String),
    codigo: expect.any(String),
    nombre: expect.any(String),

    especialidad: {
      id: expect.any(String),
      nombre: expect.any(String),
    },
    tutorCentro: {
      id: expect.any(String),
      nombre: expect.any(String),
      apellidos: expect.any(String),
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
      it('should return an array with CursoResponseDto - admin', async () => {
        const response = await request(app.getHttpServer())
          .get(baseEndpoint)
          .set('Authorization', `Bearer ${adminToken}`)
          .expect(200)

        expect(response.body).toBeInstanceOf(Array)

        const curso = response.body[0]

        expect(curso).toEqual(expectedCursoStructure)
      })
    })
  })
})
