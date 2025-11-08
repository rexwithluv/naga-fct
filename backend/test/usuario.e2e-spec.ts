import request from 'supertest'

describe('UsuarioController (e2e)', () => {
  const baseEndpoint = '/usuarios'

  const validateUsuarioStructure = (usuario: any) => {
    const tutorCentroStructure = {
      id: expect.any(String),
      nombre: expect.any(String),
      apellidos: expect.any(String),
      email: expect.any(String),
      activo: expect.any(Boolean),

      curso: {
        id: expect.any(String),
        codigo: expect.any(String),
        nombre: expect.any(String),
        especialidad: {
          id: expect.any(String),
          nombre: expect.any(String),
        },
      },
    }

    const haveTutorCentro = usuario?.tutorCentro !== null
    const expectedStructure = {
      id: expect.any(String),
      email: expect.any(String),
      activo: expect.any(Boolean),

      rol: {
        id: expect.any(String),
        nombre: expect.any(String),
      },
      tutorCentro: haveTutorCentro ? tutorCentroStructure : null,
    }

    expect(usuario).toEqual(expectedStructure)
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
      it('should return an array', async () => {
        const response = await request(app.getHttpServer())
          .get(baseEndpoint)
          .set('Authorization', `Bearer ${adminToken}`)
          .expect(200)

        expect(response.body).toBeInstanceOf(Array)

        const usuario = response.body[0]

        validateUsuarioStructure(usuario)
      })
    })
  })
  describe(`GET ${baseEndpoint}/me`, () => {
    const endpoint = `${baseEndpoint}/me`

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
      it('should return my data', async () => {
        const response = await request(app.getHttpServer())
          .get(endpoint)
          .set('Authorization', `Bearer ${adminToken}`)
          .expect(200)

        const usuario = response.body
        validateUsuarioStructure(usuario)
      })
    })
  })
  describe('GET /usuarios/:id', () => {
    const endpoint = `${baseEndpoint}/1`
    const endpointTutorCentroNull = endpoint
    const endpointTutorCentroObject = `${baseEndpoint}/2`

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
      it('should return an array with the tutorCentro object', async () => {
        const response = await request(app.getHttpServer())
          .get(endpointTutorCentroObject)
          .set('Authorization', `Bearer ${adminToken}`)
          .expect(200)

        const usuario = response.body
        validateUsuarioStructure(usuario)
      })
      it('should return an array with tutorCentro null', async () => {
        const response = await request(app.getHttpServer())
          .get(endpointTutorCentroNull)
          .set('Authorization', `Bearer ${adminToken}`)
          .expect(200)

        const usuario = response.body
        validateUsuarioStructure(usuario)
      })
    })
    describe('Errors', () => {
      const notExistUser = `${baseEndpoint}/999999`
      it('should return 404', () => {
        return request(app.getHttpServer())
          .get(notExistUser)
          .set('Authorization', `Bearer ${adminToken}`)
          .expect(404)
      })
    })
  })

  /*  describe('POST /usuarios', () => {
    describe('Authorization', () => {
      const newAdmin = {
        email: `new.admin.user.${Date.now()}@edu.xunta.gal`,
        rolId: 1,
        tutor: null,
        activo: false,
      }
      const newUser = {
        email: `new.standard.user.${Date.now()}@edu.xunta.gal`,
        rolId: 2,
        tutorId: 1,
        activo: true,
      }

      it('POST /usuarios (ADMIN) - Create admin user', () => {
        return request(app.getHttpServer())
          .post(baseEndpoint)
          .set('Authorization', `Bearer ${adminToken}`)
          .send(newAdmin)
          .expect(201)
      })

      it('should return 403', () => {
        return request(app.getHttpServer())
          .post(baseEndpoint)
          .set('Authorization', `Bearer ${standardToken}`)
          .send(newUser)
          .expect(403)
      })

      it('should return 401', () => {
        return request(app.getHttpServer()).post(baseEndpoint).send(newUser).expect(401)
      })
    })
    describe('Response', () => {
      const newAdmin = {
        email: `new.admin.user.${Date.now()}@edu.xunta.gal`,
        rolId: 1,
        tutorCentroId: null,
        activo: false,
      }
      const newUser = {
        email: `new.standard.user.${Date.now()}@edu.xunta.gal`,
        rolId: 2,
        tutorCentroId: 3,
        activo: true,
      }

      it('should return a created admin user and tutorCentro null', async () => {
        const response = await request(app.getHttpServer())
          .post(baseEndpoint)
          .set('Authorization', `Bearer ${adminToken}`)
          .send(newAdmin)
          .expect(201)

        const adminCreated = response.body

        expect(adminCreated).toHaveProperty('id')
        expect(typeof adminCreated.id).toBe('string')

        expect(adminCreated).toHaveProperty('email')
        expect(typeof adminCreated.email).toBe('string')

        expect(adminCreated).toHaveProperty('rol')
        expect(typeof adminCreated.rol).toBe('object')
        expect(adminCreated.rol).toHaveProperty('id')
        expect(typeof adminCreated.rol.id).toBe('string')
        expect(adminCreated.rol).toHaveProperty('nombre')
        expect(typeof adminCreated.nombre).toBe('string')

        expect(adminCreated).toHaveProperty('tutorCentro')
        expect(typeof adminCreated.TutorCentro).toBeNull()

        expect(adminCreated).toHaveProperty('activo')
        expect(typeof adminCreated.activo).toBe(false)
      })

      it('should return a created standard user', async () => {
        const response = await request(app.getHttpServer())
          .post(baseEndpoint)
          .set('Authorization', `Bearer ${adminToken}`)
          .send(newUser)
          .expect(201)

        const userCreated = response.body

        expect(userCreated).toHaveProperty('id')
        expect(typeof userCreated.id).toBe('string')

        expect(userCreated).toHaveProperty('email')
        expect(typeof userCreated.email).toBe('string')

        expect(userCreated).toHaveProperty('rol')
        expect(typeof userCreated.rol).toBe('object')
        expect(userCreated.rol).toHaveProperty('id')
        expect(typeof userCreated.rol.id).toBe('string')
        expect(userCreated.rol).toHaveProperty('nombre')
        expect(typeof userCreated.nombre).toBe('string')

        expect(userCreated).toHaveProperty('tutorCentro')
        expect(typeof userCreated.TutorCentro).toBe('object')
        expect(userCreated.TutorCentro).toHaveProperty('id')
        expect(typeof userCreated.TutorCentro.id).toBe('string')
        expect(userCreated.TutorCentro).toHaveProperty('nombre')
        expect(typeof userCreated.TutorCentro.id).toBe('string')
        expect(userCreated.TutorCentro).toHaveProperty('apellidos')
        expect(typeof userCreated.TutorCentro.id).toBe('string')

        expect(userCreated).toHaveProperty('activo')
        expect(typeof userCreated.activo).toBe(true)
      })
    })
    describe('Errors', () => {
      const badUser = {
        email: `new.standard.user.${Date.now()}@edu.xunta.gal`,
        rolId: 20,
        tutorId: -4,
        activo: 'true',
      }

      it('should return 400', async () => {
        return request(app.getHttpServer())
          .post(baseEndpoint)
          .set('Authorization', `Bearer ${adminToken}`)
          .send(badUser)
          .expect(400)
      })
    })
  }) */
})

/* describe('PATCH /usuarios/:id (Actualización)', () => {
    const updatePayload = {
      email: `updated.user.${Date.now()}@test.com`,
      activo: false,
    };

    it('PATCH /usuarios/:id (ADMIN) - Actualización exitosa', async () => {
      expect(createdUserId).toBeDefined();

      const response = await request(app.getHttpServer())
        .patch(`${endpoint}/${createdUserId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send(updatePayload)
        .expect(200);

      expect(response.body).toHaveProperty('id', createdUserId);
      expect(response.body.email).toBe(updatePayload.email);
      expect(response.body.activo).toBe(updatePayload.activo);
      expect(response.body).not.toHaveProperty('password');
    });

    it('PATCH /usuarios/:id (STANDARD) - Acceso prohibido a OTROS usuarios', () => {
      return request(app.getHttpServer())
        .patch(`${endpoint}/${createdUserId}`)
        .set('Authorization', `Bearer ${standardToken}`)
        .send({
          email: 'unauthorized@change.com'
        })
        .expect(403);
    });

    it('PATCH /usuarios/:id (ADMIN) - Intento de actualizar un campo no permitido (rolId)', () => {
      return request(app.getHttpServer())
        .patch(`${endpoint}/${createdUserId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          rolId: 1 // Asumiendo 1 es ADMIN
        })
        .expect(400); // O 403, dependiendo de la lógica de negocio para campos sensibles
    });
  });

  // --- DELETE /usuarios/:id ---
  // ----------------------------
  describe('DELETE /usuarios/:id (Eliminación)', () => {
    it('DELETE /usuarios/:id (STANDARD) - Acceso prohibido', () => {
      // Intentamos eliminar el usuario recién creado con token STANDARD
      expect(createdUserId).toBeDefined();

      return request(app.getHttpServer())
        .delete(`${endpoint}/${createdUserId}`)
        .set('Authorization', `Bearer ${standardToken}`)
        .expect(403);
    });

    it('DELETE /usuarios/:id (ADMIN) - Eliminación exitosa', async () => {
      expect(createdUserId).toBeDefined();

      // 1. Eliminar el usuario (debería devolver 200 o 204 dependiendo de tu API)
      await request(app.getHttpServer())
        .delete(`${endpoint}/${createdUserId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200); // o 204 No Content

      // 2. Comprobar que ya no existe (verificación)
      await request(app.getHttpServer())
        .get(`${endpoint}/${createdUserId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(404);
    });

    it('DELETE /usuarios/:id (ADMIN) - Usuario no encontrado', () => {
      return request(app.getHttpServer())
        .delete(`${endpoint}/999999`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(404);
    });
  }); */
