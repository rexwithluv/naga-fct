import request from 'supertest'

describe('RolUsuarioController (e2e)', () => {
  const endpoint = '/roles-usuario'

  describe('GET /roles-usuario', () => {
    describe('Authorization', () => {
      it('should return 200', () => {
        return request(app.getHttpServer())
          .get(endpoint)
          .set('Authorization', `Bearer ${adminToken}`)
          .expect(200)
      })

      it('should return 403', () => {
        return request(app.getHttpServer())
          .get(endpoint)
          .set('Authorization', `Bearer ${standardToken}`)
          .expect(403)
      })

      it('should return 401', () => {
        return request(app.getHttpServer()).get(endpoint).expect(401)
      })
    })

    describe('Response', () => {
      it('should return an array with id and nombre', async () => {
        const response = await request(app.getHttpServer())
          .get(endpoint)
          .set('Authorization', `Bearer ${adminToken}`)
          .expect(200)

        expect(response.body).toBeInstanceOf(Array)

        const role = response.body[0]

        expect(role).toHaveProperty('id')
        expect(typeof role.id).toBe('string')

        expect(role).toHaveProperty('nombre')
        expect(typeof role.nombre).toBe('string')
      })
    })
  })
})
