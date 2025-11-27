import request from 'supertest'

describe('EmpresaController (e2e)', () => {
  const baseEndpoint = '/empresas'

  const validateEmpresaStructure = (empresa: any) => {
    const standardEmpresaStructure = {
      id: expect.any(Number),
      nombre: expect.any(String),
      direccion: expect.any(String),
      observaciones: expect.any(String),
      activa: expect.any(Boolean),
      plazas: expect.any(Number),

      concello: { id: expect.any(Number), nombre: expect.any(String) },
      contacto: {
        nombre: expect.any(String),
        email: expect.any(String),
        telefono: expect.any(String),
      },
      skills: expect.arrayContaining([
        expect.objectContaining({ id: expect.any(Number), nombre: expect.any(String) }),
      ]),
    }
    const adminEmpresaStructure = {
      ...standardEmpresaStructure,
      especialidad: {
        id: expect.any(Number),
        nombre: expect.any(String),
      },
    }

    const expectedStructure =
      empresa?.especialidad === undefined ? standardEmpresaStructure : adminEmpresaStructure

    expect(empresa).toEqual(expectedStructure)
  }
  const createEmpresaPayload = () => {
    return {
      nombre: 'EmpresaTest',
      concelloId: 1,
      direccion: 'Dirección de prueba',
      observaciones: 'Observaciones de prueba',
      contacto: {
        nombre: 'Contacto de prueba',
        email: 'contacto@test.com',
        telefono: '123456789',
      },
      activa: true,
      plazas: 1,
      skills: [1, 2, 3],
      especialidadId: 1,
    }
  }

  describe(`GET ${baseEndpoint}`, () => {
    describe('Authorization', () => {
      it('should return 200', () => {
        return request(app.getHttpServer())
          .get(baseEndpoint)
          .set('Authorization', adminToken)
          .expect(200)
      })

      it('should return 200', () => {
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
      it('should return an array with especialidad - admin', async () => {
        const response = await request(app.getHttpServer())
          .get(baseEndpoint)
          .set('Authorization', adminToken)
          .expect(200)

        expect(response.body).toBeInstanceOf(Array)

        const empresa = response.body[0]
        validateEmpresaStructure(empresa)
      })

      it('should return an array without especialidad - standard', async () => {
        const response = await request(app.getHttpServer())
          .get(baseEndpoint)
          .set('Authorization', standardToken)
          .expect(200)

        expect(response.body).toBeInstanceOf(Array)

        const empresa = response.body[0]
        validateEmpresaStructure(empresa)
      })
    })
  })
  describe(`GET ${baseEndpoint}/:id`, () => {
    const endpoint = `${baseEndpoint}/1`
    describe('Authorization', () => {
      it('should return 200', () => {
        return request(app.getHttpServer())
          .get(endpoint)
          .set('Authorization', adminToken)
          .expect(200)
      })

      it('should return 200', () => {
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
      it('should return an EmpresaDtoResponse with especialidad field - admin', async () => {
        const response = await request(app.getHttpServer())
          .get(endpoint)
          .set('Authorization', adminToken)
          .expect(200)

        const empresa = response.body
        validateEmpresaStructure(empresa)
      })

      it('should return an EmpresaDtoResponse without especialidad field - standard', async () => {
        const response = await request(app.getHttpServer())
          .get(endpoint)
          .set('Authorization', standardToken)
          .expect(200)

        const empresa = response.body
        validateEmpresaStructure(empresa)
      })
    })
  })
  describe(`POST ${baseEndpoint}`, () => {
    describe('Authorization', () => {
      it('should return 201 - admin', () => {
        return request(app.getHttpServer())
          .post(baseEndpoint)
          .set('Authorization', adminToken)
          .send(createEmpresaPayload())
          .expect(201)
      })
      it('should return 201 - standard', () => {
        return request(app.getHttpServer())
          .post(baseEndpoint)
          .set('Authorization', standardToken)
          .send(createEmpresaPayload())
          .expect(201)
      })
      it('should return 401 - without token', () => {
        return request(app.getHttpServer())
          .post(baseEndpoint)
          .send(createEmpresaPayload())
          .expect(401)
      })
    })
    describe('Response', () => {
      it('should return EmpresaResponseDto with Especialidad field - admin', async () => {
        const response = await request(app.getHttpServer())
          .post(baseEndpoint)
          .set('Authorization', adminToken)
          .send(createEmpresaPayload())
          .expect(201)

        const empresa = response.body
        validateEmpresaStructure(empresa)
      })
      it('should return EmpresaResponseDto without Especialidad field - standard', async () => {
        const response = await request(app.getHttpServer())
          .post(baseEndpoint)
          .set('Authorization', standardToken)
          .send(createEmpresaPayload())
          .expect(201)

        const empresa = response.body
        validateEmpresaStructure(empresa)
      })
    })
  })
  describe(`PUT ${baseEndpoint}/:id`, () => {})
  describe(`DELETE ${baseEndpoint}/:id`, () => {
    const endpoint = `${baseEndpoint}/1`
    const forbiddenEndpoint = `${baseEndpoint}/3`
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
      it('should return 403 - delete Empresa que no es de mi Especialidad', () => {
        return request(app.getHttpServer())
          .delete(forbiddenEndpoint)
          .set('Authorization', standardToken)
          .expect(403)
      })
    })
  })
})
