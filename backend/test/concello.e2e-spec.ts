import request from 'supertest'
import { EspecialidadResponseDto } from '../src/especialidad/dto/especialidad-response.dto'

describe('ConcelloController (e2e)', () => {
  const baseEndpoint = '/concellos'

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
      it('should return an array with id and nombre - admin', async () => {
        const response = await request(app.getHttpServer())
          .get(baseEndpoint)
          .set('Authorization', `Bearer ${adminToken}`)
          .expect(200)

        expect(response.body).toBeInstanceOf(Array)

        const role = response.body[0]

        expect(role).toHaveProperty('id')
        expect(typeof role.id).toBe('string')

        expect(role).toHaveProperty('nombre')
        expect(typeof role.nombre).toBe('string')
      })

      it('should return an array with id and nombre - standard', async () => {
        const response = await request(app.getHttpServer())
          .get(baseEndpoint)
          .set('Authorization', `Bearer ${standardToken}`)
          .expect(200)

        expect(response.body).toBeInstanceOf(Array)

        const role = response.body[0]

        expect(role).toHaveProperty('id')
        expect(typeof role.id).toBe('string')

        expect(role).toHaveProperty('nombre')
        expect(typeof role.nombre).toBe('string')
      })
    })

    describe('Filters', () => {
      const filterEndpoint = `${baseEndpoint}?nombre=Tui`
      it('should return an array where all the names start with "Tui" - admin', async () => {
        const response = await request(app.getHttpServer())
          .get(filterEndpoint)
          .set('Authorization', `Bearer ${adminToken}`)
          .expect(200)

        expect(
          response.body.every((c: EspecialidadResponseDto) => c.nombre.startsWith('Tui')),
        ).toBe(true)
      })

      it('should return an array where all the names start with "Tui" - standard', async () => {
        const response = await request(app.getHttpServer())
          .get(filterEndpoint)
          .set('Authorization', `Bearer ${standardToken}`)
          .expect(200)

        expect(
          response.body.every((c: EspecialidadResponseDto) => c.nombre.startsWith('Tui')),
        ).toBe(true)
      })
    })
  })
})
