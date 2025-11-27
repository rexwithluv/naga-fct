import request from 'supertest'

describe('AlumnoController (e2e)', () => {
  const baseEndpoint = '/alumnos'

  const validateAlumnoStructure = (alumno: any) => {
    const adminAlumnoStructure = {
      id: expect.any(Number),
      dniNie: expect.any(String),
      nombre: expect.any(String),
      apellidos: expect.any(String),
      email: expect.any(String),
      telefono: expect.any(String),
      numeroSeguridadSocial: expect.any(String),

      concello: {
        id: expect.any(Number),
        nombre: expect.any(String),
      },
      estadoAlumno: {
        id: expect.any(Number),
        nombre: expect.any(String),
      },
      curso: {
        id: expect.any(Number),
        nombre: expect.any(String),
        codigo: expect.any(String),
        especialidad: {
          id: expect.any(Number),
          nombre: expect.any(String),
        },
      },
      tutorCentro: {
        id: expect.any(Number),
        nombre: expect.any(String),
        apellidos: expect.any(String),
        email: expect.any(String),
      },
    }
    const standardAlumnoStructure = {
      id: expect.any(Number),
      dniNie: expect.any(String),
      nombre: expect.any(String),
      apellidos: expect.any(String),
      email: expect.any(String),
      telefono: expect.any(String),
      numeroSeguridadSocial: expect.any(String),

      concello: {
        id: expect.any(Number),
        nombre: expect.any(String),
      },
      estadoAlumno: {
        id: expect.any(Number),
        nombre: expect.any(String),
      },
    }

    const expectedStructure =
      alumno?.tutorCentro === undefined ? standardAlumnoStructure : adminAlumnoStructure
    expect(alumno).toEqual(expectedStructure)
  }
  const createAlumnoPayload = () => {
    return {
      dniNie: `X${String(Date.now()).slice(6, 13)}A`,
      nombre: 'Test',
      apellidos: 'E2E',
      email: `test_${Date.now()}@test.com`,
      telefono: '123456789',
      numeroSeguridadSocial: `28${String(Date.now()).slice(5, 13)}40`,
      concelloId: 1,
      estadoAlumnoId: 1,
      tutorCentroId: 3,
    }
  }

  describe(`GET ${baseEndpoint}`, () => {
    describe('Authorization', () => {
      it('should return 200 - admin', () => {
        return request(app.getHttpServer())
          .get(baseEndpoint)
          .set('Authorization', adminToken)
          .expect(200)
      })

      it('should return 200 - standard', () => {
        return request(app.getHttpServer())
          .get(baseEndpoint)
          .set('Authorization', standardToken)
          .expect(200)
      })

      it('should return 401', () => {
        return request(app.getHttpServer()).get(baseEndpoint).expect(401)
      })
    })
    describe('Response', () => {
      it('should an array with tutorCentro field - admin', async () => {
        const response = await request(app.getHttpServer())
          .get(baseEndpoint)
          .set('Authorization', adminToken)
          .expect(200)

        expect(response.body).toBeInstanceOf(Array)
        expect(response.body.length).toBeGreaterThan(0)

        const alumno = response.body[0]
        validateAlumnoStructure(alumno)
      })
      it('should an array without tutorCentro field - standard', async () => {
        const response = await request(app.getHttpServer())
          .get(baseEndpoint)
          .set('Authorization', standardToken)
          .expect(200)

        expect(response.body).toBeInstanceOf(Array)
        expect(response.body.length).toBeGreaterThan(0)

        const alumno = response.body[0]
        validateAlumnoStructure(alumno)
      })
    })
  })
  describe(`GET ${baseEndpoint}/:id`, () => {
    const endpoint = `${baseEndpoint}/1`

    describe('Authorization', () => {
      it('should return 200 - admin', () => {
        return request(app.getHttpServer())
          .get(endpoint)
          .set('Authorization', adminToken)
          .expect(200)
      })

      it('should return 200 - standard', () => {
        return request(app.getHttpServer())
          .get(endpoint)
          .set('Authorization', standardToken)
          .expect(200)
      })

      it('should return 401', () => {
        return request(app.getHttpServer()).get(endpoint).expect(401)
      })
    })
    describe('Response', () => {
      it('should return an AlumnoResponseDto with tutorCentro field - admin', async () => {
        const response = await request(app.getHttpServer())
          .get(endpoint)
          .set('Authorization', adminToken)
          .expect(200)

        const alumno = response.body
        validateAlumnoStructure(alumno)
      })
      it('should return an AlumnoResponseDto without tutorCentro field - standard', async () => {
        const response = await request(app.getHttpServer())
          .get(endpoint)
          .set('Authorization', standardToken)
          .expect(200)

        const alumno = response.body
        validateAlumnoStructure(alumno)
      })
    })
    describe('Errors', () => {
      const forbiddenEndpoint = `${baseEndpoint}/5`
      const notFoundEndpoint = `${baseEndpoint}/9999`

      it('should return 403, standard user dont see others alumnos', async () => {
        return request(app.getHttpServer())
          .get(forbiddenEndpoint)
          .set('Authorization', standardToken)
          .expect(403)
      })
      it('should return 404', () => {
        return request(app.getHttpServer())
          .get(notFoundEndpoint)
          .set('Authorization', standardToken)
          .expect(404)
      })
    })
  })

  describe(`POST ${baseEndpoint}`, () => {
    describe('Authorization', () => {
      it('should return 201 - admin', () => {
        return request(app.getHttpServer())
          .post(baseEndpoint)
          .set('Authorization', adminToken)
          .send(createAlumnoPayload())
          .expect(201)
      })
      it('should return 201 - standard', () => {
        return request(app.getHttpServer())
          .post(baseEndpoint)
          .set('Authorization', standardToken)
          .send(createAlumnoPayload())
          .expect(201)
      })
      it('should return 401 - without token', () => {
        return request(app.getHttpServer())
          .post(baseEndpoint)
          .send(createAlumnoPayload())
          .expect(401)
      })
    })
    describe('Response', () => {
      it('should return AlumnoResponseDto with TutorCentro field - admin', async () => {
        const response = await request(app.getHttpServer())
          .post(baseEndpoint)
          .set('Authorization', adminToken)
          .send(createAlumnoPayload())
          .expect(201)

        const alumno = response.body
        validateAlumnoStructure(alumno)
      })
      it('should return AlumnoResponseDto without TutorCentro field - standard', async () => {
        const response = await request(app.getHttpServer())
          .post(baseEndpoint)
          .set('Authorization', standardToken)
          .send(createAlumnoPayload())
          .expect(201)

        const alumno = response.body
        validateAlumnoStructure(alumno)
      })
    })
  })

  describe(`PUT ${baseEndpoint}/:id`, () => {
    const endpoint = `${baseEndpoint}/1`
    const forbiddenEndpoint = `${baseEndpoint}/5`
    describe('Authorization', () => {
      it('should return 200 - admin', () => {
        return request(app.getHttpServer())
          .put(endpoint)
          .set('Authorization', adminToken)
          .send(createAlumnoPayload())
          .expect(200)
      })
      it('should return 200 - standard', () => {
        return request(app.getHttpServer())
          .put(endpoint)
          .set('Authorization', standardToken)
          .send(createAlumnoPayload())
          .expect(200)
      })
      it('should return 401 - without token', () => {
        return request(app.getHttpServer()).delete(endpoint).send(createAlumnoPayload()).expect(401)
      })
    })
    describe('Response', () => {
      it('should return AlumnoResponseDto with TutorCentro field - admin', async () => {
        const response = await request(app.getHttpServer())
          .put(endpoint)
          .set('Authorization', adminToken)
          .send(createAlumnoPayload())
          .expect(200)

        const alumno = response.body
        validateAlumnoStructure(alumno)
      })
      it('should return AlumnoResponseDto without TutorCentro field - standard', async () => {
        const response = await request(app.getHttpServer())
          .put(endpoint)
          .set('Authorization', standardToken)
          .send(createAlumnoPayload())
          .expect(200)

        const alumno = response.body
        validateAlumnoStructure(alumno)
      })
    })
    describe('Errors', () => {
      it('should return 403 trying to update Alumno in another Curso that not my own - standard', () => {
        return request(app.getHttpServer())
          .put(forbiddenEndpoint)
          .set('Authorization', standardToken)
          .send(createAlumnoPayload())
          .expect(403)
      })
    })
  })

  describe(`DELETE ${baseEndpoint}/:id`, () => {
    const endpoint = `${baseEndpoint}/1`
    const forbiddenEndpoint = `${baseEndpoint}/7`
    describe('Authorization', () => {
      it('should return 204 - admin', () => {
        return request(app.getHttpServer())
          .delete(endpoint)
          .set('Authorization', adminToken)
          .expect(204)
      })
      it('should return 204 - standard', () => {
        return request(app.getHttpServer())
          .delete(endpoint)
          .set('Authorization', standardToken)
          .expect(204)
      })
      it('should return 401 - without token', () => {
        return request(app.getHttpServer()).delete(endpoint).expect(401)
      })
    })
    describe('Errors', () => {
      it('should return 403 trying to delete Alumno in another Curso that not my own - standard', () => {
        return request(app.getHttpServer())
          .delete(forbiddenEndpoint)
          .set('Authorization', standardToken)
          .expect(403)
      })
    })
  })
})
