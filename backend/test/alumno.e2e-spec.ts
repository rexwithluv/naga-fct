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
      dniNie: 'X55555555A',
      nombre: 'Test',
      apellidos: 'E2E',
      email: `test_${Date.now()}@test.com`,
      telefono: '123456789',
      numeroSeguridadSocial: `28${String(Date.now()).slice(0, 8)}40`,
      concelloId: 1,
      estadoAlumnoId: 1,
      tutorCentroId: 1,
    }
  }

  describe(`GET ${baseEndpoint}`, () => {
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
      it('should an array with tutorCentro field - admin', async () => {
        const response = await request(app.getHttpServer())
          .get(baseEndpoint)
          .set('Authorization', `Bearer ${adminToken}`)
          .expect(200)

        expect(response.body).toBeInstanceOf(Array)
        expect(response.body.length).toBeGreaterThan(0)

        const alumno = response.body[0]
        validateAlumnoStructure(alumno)
      })
      it('should an array without tutorCentro field - standard', async () => {
        const response = await request(app.getHttpServer())
          .get(baseEndpoint)
          .set('Authorization', `Bearer ${standardToken}`)
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
      it('should return an AlumnoResponseDto with tutorCentro field - admin', async () => {
        const response = await request(app.getHttpServer())
          .get(endpoint)
          .set('Authorization', `Bearer ${adminToken}`)
          .expect(200)

        const alumno = response.body
        validateAlumnoStructure(alumno)
      })
      it('should return an AlumnoResponseDto without tutorCentro field - standard', async () => {
        const response = await request(app.getHttpServer())
          .get(endpoint)
          .set('Authorization', `Bearer ${standardToken}`)
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

  // describe(`POST ${baseEndpoint}`, () => {
  //   describe('Authorization', () => {
  //     it('should return 201 - admin', () => {
  //       return request(app.getHttpServer())
  //         .post(baseEndpoint)
  //         .set('Authorization', `Bearer ${adminToken}`)
  //         .send(createAlumnoPayload())
  //         .expect(201)
  //     })
  //     it('should return 201 - standard', () => {
  //       return request(app.getHttpServer())
  //         .post(baseEndpoint)
  //         .set('Authorization', `Bearer ${standardToken}`)
  //         .send(createAlumnoPayload())
  //         .expect(201)
  //     })
  //     it('should return 401 - without token', () => {
  //       return request(app.getHttpServer())
  //         .post(baseEndpoint)
  //         .send(createAlumnoPayload())
  //         .expect(401)
  //     })
  //   })
  // describe('Response', () => {
  //   it('should return AlumnoResponseDto with TutorCentro field - admin', () => {})
  //   it('should return AlumnoResponseDto without TutorCentro field - standard', () => {})
  // })
  // describe('Errors', () => {
  //   it('should return 403 trying to create Alumno in another Curso that not my own - standard', () => {})
  // })
  // })

  // describe(`PUT ${baseEndpoint}/:id`, () => {
  //   describe('Authorization', () => {
  //     it('should return 200 - admin', () => {})
  //     it('should return 200 - standard', () => {})
  //     it('should return 401 - without token', () => {})
  //   })
  //   describe('Response', () => {
  //     it('should return AlumnoResponseDto with TutorCentro field - admin', () => {})
  //     it('should return AlumnoResponseDto without TutorCentro field - standard', () => {})
  //   })
  //   describe('Errors', () => {
  //     it('should return 403 trying to update Alumno in another Curso that not my own - standard', () => {})
  //   })
  // })

  // describe(`DELETE ${baseEndpoint}/:id`, () => {
  //   describe('Authorization', () => {
  //     it('should return 204 - admin', () => {})
  //     it('should return 204 - standard', () => {})
  //     it('should return 401 - without token', () => {})
  //   })
  //   describe('Errors', () => {
  //     it('should return 403 trying to delete Alumno in another Curso that not my own - standard', () => {})
  //   })
  // })
})
