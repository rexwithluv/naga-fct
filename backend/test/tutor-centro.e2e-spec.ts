import request from 'supertest'

describe('AlumnoController (e2e)', () => {
  const baseEndpoint = '/tutores-centro'

  const validateTutorCentroStructure = (tutorCentro: any): void => {
    const expectedTutorCentroWithoutUserStructure = {
      id: expect.any(Number),
      nombre: expect.any(String),
      apellidos: expect.any(String),
      email: expect.any(String),
      activo: expect.any(Boolean),

      curso: {
        id: expect.any(Number),
        nombre: expect.any(String),
        codigo: expect.any(String),
      },
    }
    const expectedTutorCentroWithUserStructure = {
      ...expectedTutorCentroWithoutUserStructure,
      usuario: {
        id: expect.any(Number),
        email: expect.any(String),
        activo: expect.any(Boolean),
      },
    }

    const hasUser = tutorCentro?.usuario !== undefined
    expect(tutorCentro).toEqual(
      hasUser ? expectedTutorCentroWithUserStructure : expectedTutorCentroWithoutUserStructure,
    )
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
        validateTutorCentroStructure(tutorCentro)
      })
    })
  })
  describe(`GET ${baseEndpoint}/:id`, () => {
    const endpoint = `${baseEndpoint}/1`
    describe('Authorization', () => {
      it('should return 200 - admin', () => {
        return request(app.getHttpServer())
          .get(endpoint)
          .set('Authorization', `Bearer ${adminToken}`)
          .expect(200)
      })

      it('should return 403 - standard', () => {
        return request(app.getHttpServer())
          .get(endpoint)
          .set('Authorization', `Bearer ${standardToken}`)
          .expect(403)
      })

      it('should return 401 - without token', () => {
        return request(app.getHttpServer()).get(endpoint).expect(401)
      })
    })
    describe('Response', () => {
      it('should an array with TutorCentroResponseDto', async () => {
        const response = await request(app.getHttpServer())
          .get(endpoint)
          .set('Authorization', `Bearer ${adminToken}`)
          .expect(200)

        const tutorCentro = response.body
        validateTutorCentroStructure(tutorCentro)
      })
    })
  })
})
