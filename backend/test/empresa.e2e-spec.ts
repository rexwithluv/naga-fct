import request from 'supertest'

describe('EmpresaController (e2e)', () => {
  const baseEndpoint = '/empresas'

  const standardExpectedEmpresaStructure = {
    id: expect.any(String),
    nombre: expect.any(String),
    direccion: expect.any(String),
    observaciones: expect.any(String),
    activa: expect.any(Boolean),
    plazas: expect.any(Number),

    concello: { id: expect.any(String), nombre: expect.any(String) },
    contacto: {
      nombre: expect.any(String),
      email: expect.any(String),
      telefono: expect.any(String),
    },
    skills: expect.arrayContaining([
      expect.objectContaining({ id: expect.any(String), nombre: expect.any(String) }),
    ]),
  }
  const adminExpectedEmpresaStructure = {
    ...standardExpectedEmpresaStructure,
    especialidad: {
      id: expect.any(String),
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
      it('should return an array with especialidad - admin', async () => {
        const response = await request(app.getHttpServer())
          .get(baseEndpoint)
          .set('Authorization', `Bearer ${adminToken}`)
          .expect(200)

        expect(response.body).toBeInstanceOf(Array)

        const empresa = response.body[0]
        expect(empresa).toEqual(adminExpectedEmpresaStructure)
      })

      it('should return an array without especialidad - standard', async () => {
        const response = await request(app.getHttpServer())
          .get(baseEndpoint)
          .set('Authorization', `Bearer ${standardToken}`)
          .expect(200)

        expect(response.body).toBeInstanceOf(Array)

        const empresa = response.body[0]
        expect(empresa).toEqual(standardExpectedEmpresaStructure)
      })
    })
  })
  describe(`GET ${baseEndpoint}/:id`, () => {
    const endpoint = `${baseEndpoint}/1`
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
      it('should return an EmpresaDtoResponse with especialidad field - admin', async () => {
        const response = await request(app.getHttpServer())
          .get(endpoint)
          .set('Authorization', `Bearer ${adminToken}`)
          .expect(200)

        const empresa = response.body
        expect(empresa).toEqual(adminExpectedEmpresaStructure)
      })

      it('should return an EmpresaDtoResponse without especialidad field - standard', async () => {
        const response = await request(app.getHttpServer())
          .get(endpoint)
          .set('Authorization', `Bearer ${standardToken}`)
          .expect(200)

        const empresa = response.body
        expect(empresa).toEqual(standardExpectedEmpresaStructure)
      })
    })
  })
})
