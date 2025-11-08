import request from 'supertest'

describe('EspecialidadController (e2e)', () => {
  const baseEndpoint = '/especialidades'

  const expectedEspecialidadStructure = {
    id: expect.any(String),
    nombre: expect.any(String),
  }

  describe(`GET ${baseEndpoint}`, () => {
    describe('Authorization', () => {
      it('should return 200', () => {
        return request(app.getHttpServer())
          .get(baseEndpoint)
          .set('Authorization', `Bearer ${adminToken}`)
          .expect(200)
      })

      it('should return 403', () => {
        return request(app.getHttpServer())
          .get(baseEndpoint)
          .set('Authorization', `Bearer ${standardToken}`)
          .expect(403)
      })

      it('should return 401', () => {
        return request(app.getHttpServer()).get(baseEndpoint).expect(401)
      })
    })

    describe('Response', () => {
      it('should an array with id and nombre', async () => {
        const response = await request(app.getHttpServer())
          .get(baseEndpoint)
          .set('Authorization', `Bearer ${adminToken}`)
          .expect(200)

        expect(response.body).toBeInstanceOf(Array)

        const especialidad = response.body[0]
        expect(especialidad).toEqual(expectedEspecialidadStructure)
      })
    })
  })
})
