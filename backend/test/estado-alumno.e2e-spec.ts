import request from 'supertest'

describe('EstadoAlumnoController (e2e)', () => {
  const endpoint = '/estados-alumno'

  describe(`GET ${endpoint}`, () => {
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

      it('should return 401 - without token', () => {
        return request(app.getHttpServer()).get(endpoint).expect(401)
      })
    })

    describe('Response', () => {
      it('should return an array with EstadoAlumnoResponseDto - admin', async () => {
        const response = await request(app.getHttpServer())
          .get(endpoint)
          .set('Authorization', `Bearer ${adminToken}`)
          .expect(200)

        expect(response.body).toBeInstanceOf(Array)

        const estadoAlumno = response.body[0]

        expect(estadoAlumno).toHaveProperty('id')
        expect(typeof estadoAlumno.id).toBe('string')

        expect(estadoAlumno).toHaveProperty('nombre')
        expect(typeof estadoAlumno.nombre).toBe('string')
      })
      it('should return an array with EstadoAlumnoResponseDto - standard', async () => {
        const response = await request(app.getHttpServer())
          .get(endpoint)
          .set('Authorization', `Bearer ${standardToken}`)
          .expect(200)

        expect(response.body).toBeInstanceOf(Array)

        const estadoAlumno = response.body[0]

        expect(estadoAlumno).toHaveProperty('id')
        expect(typeof estadoAlumno.id).toBe('string')

        expect(estadoAlumno).toHaveProperty('nombre')
        expect(typeof estadoAlumno.nombre).toBe('string')
      })
    })
  })
})
