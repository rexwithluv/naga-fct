import request from 'supertest'

describe('SkillController (e2e)', () => {
  const baseEndpoint = '/skills'

  const expectedSkillStructure = {
    id: expect.any(Number),
    nombre: expect.any(String),
    especialidad: {
      id: expect.any(Number),
      nombre: expect.any(String),
    },
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
      it('should return an array with SkillResponseDto - admin', async () => {
        const response = await request(app.getHttpServer())
          .get(baseEndpoint)
          .set('Authorization', `Bearer ${adminToken}`)
          .expect(200)

        expect(response.body).toBeInstanceOf(Array)

        const skill = response.body[0]
        expect(skill).toEqual(expectedSkillStructure)
      })

      it('should return an array with SkillResponseDto - standard', async () => {
        const response = await request(app.getHttpServer())
          .get(baseEndpoint)
          .set('Authorization', `Bearer ${standardToken}`)
          .expect(200)

        expect(response.body).toBeInstanceOf(Array)

        const skill = response.body[0]
        expect(skill).toEqual(expectedSkillStructure)
      })
    })
  })
})
