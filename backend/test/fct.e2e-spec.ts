import request from 'supertest'

describe('FctController (e2e)', () => {
  const baseEndpoint = '/fct'

  const validateFctStructure = (fct: any) => {
    const standardExpectedFctStructure = {
      id: expect.any(String),
      fechaInicio: expect.any(String),
      fechaFin: expect.any(String),

      alumno: {
        id: expect.any(String),
        nombre: expect.any(String),
        dniNie: expect.any(String),
        apellidos: expect.any(String),
        email: expect.any(String),
        telefono: expect.any(String),
        numeroSeguridadSocial: expect.any(String),
      },
      empresa: {
        id: expect.any(String),
        nombre: expect.any(String),
        direccion: expect.any(String),
        observaciones: expect.any(String),
      },
      tutorEmpresa: {
        id: expect.any(String),
        nombre: expect.any(String),
        apellidos: expect.any(String),
        email: expect.any(String),
        telefono: expect.any(String),
      },
    }
    const adminExpectedFctStructure = {
      id: expect.any(String),
      fechaInicio: expect.any(String),
      fechaFin: expect.any(String),

      alumno: {
        id: expect.any(String),
        nombre: expect.any(String),
        dniNie: expect.any(String),
        apellidos: expect.any(String),
        email: expect.any(String),
        telefono: expect.any(String),
        numeroSeguridadSocial: expect.any(String),

        tutorCentro: {
          id: expect.any(String),
          nombre: expect.any(String),
          apellidos: expect.any(String),
          email: expect.any(String),
        },
      },
      empresa: {
        id: expect.any(String),
        nombre: expect.any(String),
        direccion: expect.any(String),
        observaciones: expect.any(String),
      },
      tutorEmpresa: {
        id: expect.any(String),
        nombre: expect.any(String),
        apellidos: expect.any(String),
        email: expect.any(String),
        telefono: expect.any(String),
      },
    }

    if (fct?.alumno?.tutorCentro === undefined) {
      expect(fct).toEqual(standardExpectedFctStructure)
    } else {
      expect(fct).toEqual(adminExpectedFctStructure)
    }
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
      it('should return an array FctResponseDto - admin', async () => {
        const response = await request(app.getHttpServer())
          .get(baseEndpoint)
          .set('Authorization', `Bearer ${adminToken}`)
          .expect(200)

        expect(response.body).toBeInstanceOf(Array)

        const fct = response.body[0]
        validateFctStructure(fct)
      })

      it('should return an array FctResponseDto - standard', async () => {
        const response = await request(app.getHttpServer())
          .get(baseEndpoint)
          .set('Authorization', `Bearer ${standardToken}`)
          .expect(200)

        expect(response.body).toBeInstanceOf(Array)

        const fct = response.body[0]
        validateFctStructure(fct)
      })
    })
  })

  describe(`GET ${baseEndpoint}/:id`, () => {
    const endpoint = `${baseEndpoint}/1`
    const forbiddenEndpoint = `${baseEndpoint}/5`
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
      it('should return a FctResponseDto - admin', async () => {
        const response = await request(app.getHttpServer())
          .get(endpoint)
          .set('Authorization', `Bearer ${adminToken}`)
          .expect(200)

        const fct = response.body
        validateFctStructure(fct)
      })

      it('should return a FctResponseDto - standard', async () => {
        const response = await request(app.getHttpServer())
          .get(endpoint)
          .set('Authorization', `Bearer ${standardToken}`)
          .expect(200)

        const fct = response.body
        validateFctStructure(fct)
      })
    })
    describe('Errors', () => {
      it('should return 403 when a standard user tries to access FCT they do not own', () => {
        return request(app.getHttpServer())
          .get(forbiddenEndpoint)
          .set('Authorization', `Bearer ${standardToken}`)
          .expect(403)
      })
    })
  })
})
