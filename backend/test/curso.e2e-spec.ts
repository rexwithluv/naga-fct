import request from 'supertest'

describe('CursoController (e2e)', () => {
  const baseEndpoint = '/cursos'

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

        expect(curso).toHaveProperty('id')
        expect(typeof curso.id).toBe('string')

        expect(curso).toHaveProperty('codigo')
        expect(typeof curso.codigo).toBe('string')

        expect(curso).toHaveProperty('nombre')
        expect(typeof curso.nombre).toBe('string')

        expect(curso).toHaveProperty('especialidad')
        expect(typeof curso.especialidad).toBe('object')
        expect(curso.especialidad).toHaveProperty('id')
        expect(typeof curso.especialidad.id).toBe('string')
        expect(curso.especialidad).toHaveProperty('nombre')
        expect(typeof curso.especialidad.nombre).toBe('string')

        expect(curso).toHaveProperty('tutorCentro')
        expect(typeof curso.tutorCentro).toBe('object')
        expect(curso.tutorCentro).toHaveProperty('id')
        expect(typeof curso.tutorCentro.id).toBe('string')
        expect(curso.tutorCentro).toHaveProperty('nombre')
        expect(typeof curso.tutorCentro.nombre).toBe('string')
        expect(curso.tutorCentro).toHaveProperty('email')
        expect(typeof curso.tutorCentro.email).toBe('string')
        expect(curso.tutorCentro).toHaveProperty('activo')
        expect(typeof curso.tutorCentro.activo).toBe('boolean')
      })
    })
  })
})
