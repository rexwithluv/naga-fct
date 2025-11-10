import request from 'supertest'

describe('EstadoAlumnoController (e2e)', () => {
  const baseEndpoint = '/estados-alumno'

  const expectedEstadoAlumnoStructure = {
    id: expect.any(Number),
    nombre: expect.any(String),
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

      it('should return 401 - without token', () => {
        return request(app.getHttpServer()).get(baseEndpoint).expect(401)
      })
    })

    describe('Response', () => {
      it('should return an array with EstadoAlumnoResponseDto - admin', async () => {
        const response = await request(app.getHttpServer())
          .get(baseEndpoint)
          .set('Authorization', `Bearer ${adminToken}`)
          .expect(200)

        expect(response.body).toBeInstanceOf(Array)

        const estadoAlumno = response.body[0]
        expect(estadoAlumno).toEqual(expectedEstadoAlumnoStructure)
      })
      it('should return an array with EstadoAlumnoResponseDto - standard', async () => {
        const response = await request(app.getHttpServer())
          .get(baseEndpoint)
          .set('Authorization', `Bearer ${standardToken}`)
          .expect(200)

        expect(response.body).toBeInstanceOf(Array)

        const estadoAlumno = response.body[0]
        expect(estadoAlumno).toEqual(expectedEstadoAlumnoStructure)
      })
    })
  })
})
