import request from 'supertest'

describe('TutorEmpresaController (e2e)', () => {
  const baseEndpoint = '/tutores-empresa'

  const expectTutorEmpresaStructure = {
    id: expect.any(String),
    nombre: expect.any(String),
    apellidos: expect.any(String),
    email: expect.any(String),
    telefono: expect.any(String),

    empresa: {
      id: expect.any(String),
      nombre: expect.any(String),
    },
  }

  describe(`GET ${baseEndpoint}`, () => {
    describe('Authorization', () => {
      it('should return 200', () => {
        return request(app.getHttpServer())
          .get(baseEndpoint)
          .set('Authorization', `Bearer ${adminToken}`)
          .expect(200)
      })

      it('should return 200', () => {
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
      it('should return an array with TutorEmpresaResponseDto - admin', async () => {
        const response = await request(app.getHttpServer())
          .get(baseEndpoint)
          .set('Authorization', `Bearer ${adminToken}`)
          .expect(200)

        expect(response.body).toBeInstanceOf(Array)

        const tutorEmpresa = response.body[0]
        expect(tutorEmpresa).toEqual(tutorEmpresa)
      })

      it('should return an array without especialidad - standard', async () => {
        const response = await request(app.getHttpServer())
          .get(baseEndpoint)
          .set('Authorization', `Bearer ${standardToken}`)
          .expect(200)

        expect(response.body).toBeInstanceOf(Array)

        const tutorEmpresa = response.body[0]
        expect(tutorEmpresa).toEqual(tutorEmpresa)
      })
    })
  })
})
