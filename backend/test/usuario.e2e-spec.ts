import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import request from 'supertest'
import { App } from 'supertest/types'
import { AppModule } from '../src/app.module'
import { loginAsAdmin, loginAsStandard } from './auth-helpers'

describe('UsuarioController (e2e)', () => {
  let app: INestApplication<App>
  const baseEndpoint = '/usuarios'
  let adminToken: string
  let standardToken: string

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()

    adminToken = await loginAsAdmin(app)
    standardToken = await loginAsStandard(app)
  })

  afterAll(async () => {
    await app.close()
  })

  describe('GET /usuarios', () => {
    describe('Authorization', () => {
      it('should return 200', () => {
        return request(app.getHttpServer())
          .get(baseEndpoint)
          .set('Authorization', `Bearer ${adminToken}`)
          .expect(200)
      })
    })

    describe('Response', () => {
      it('should return an array', async () => {
        const response = await request(app.getHttpServer())
          .get(baseEndpoint)
          .set('Authorization', `Bearer ${adminToken}`)
          .expect(200)

        expect(response.body).toBeInstanceOf(Array)
      })
    })
  })

  describe('GET /usuarios/:id', () => {
    describe('Authorization', () => {
      const endpoint = `${baseEndpoint}/1`
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
      const endpointTutorCentroObject = `${baseEndpoint}/1`
      const endpointTutorCentroNull = `${baseEndpoint}/3`

      it('should return an array with the tutorCentro object', async () => {
        const response = await request(app.getHttpServer())
          .get(endpointTutorCentroObject)
          .set('Authorization', `Bearer ${adminToken}`)
          .expect(200)

        const usuario = response.body[0]

        expect(usuario).toHaveProperty('id')
        expect(typeof usuario.id).toBe('string')

        expect(usuario).toHaveProperty('email')
        expect(typeof usuario.email).toBe('string')

        expect(usuario).toHaveProperty('rol')
        expect(typeof usuario.rol).toBe('object')
        expect(usuario.rol).toHaveProperty('id')
        expect(typeof usuario.rol.id).toBe('string')
        expect(usuario.rol).toHaveProperty('nombre')
        expect(typeof usuario.rol.nombre).toBe('string')

        expect(usuario).toHaveProperty('tutorCentro')
        expect(typeof usuario.tutorCentro).toBe('object')
        expect(usuario).toHaveProperty('nombre')
        expect(typeof usuario.tutorCentro.nombre).toBe('string')
        expect(usuario).toHaveProperty('apellidos')
        expect(typeof usuario.tutorCentro.apellidos).toBe('string')
        expect(usuario).toHaveProperty('id')
        expect(typeof usuario.tutorCentro.id).toBe('string')

        expect(usuario).toHaveProperty('activo')
        expect(typeof usuario.activo).toBe('boolean')
      })

      it('should return an array with tutorCentro null', async () => {
        const response = await request(app.getHttpServer())
          .get(endpointTutorCentroNull)
          .set('Authorization', `Bearer ${adminToken}`)
          .expect(200)

        const usuario = response.body

        expect(usuario).toHaveProperty('id')
        expect(typeof usuario.id).toBe('string')

        expect(usuario).toHaveProperty('email')
        expect(typeof usuario.email).toBe('string')

        expect(usuario).toHaveProperty('rol')
        expect(typeof usuario.rol).toBe('object')
        expect(usuario.rol).toHaveProperty('id')
        expect(typeof usuario.rol.id).toBe('string')
        expect(usuario.rol).toHaveProperty('nombre')
        expect(typeof usuario.rol.nombre).toBe('string')

        expect(usuario).toHaveProperty('tutorCentro')
        expect(typeof usuario.TutorCentro).toBe(null)

        expect(usuario).toHaveProperty('activo')
        expect(typeof usuario.activo).toBe(true)
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

  describe('GET /usuarios/me', () => {
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
          .get(`${baseEndpoint}/me`)
          .set('Authorization', `Bearer ${adminToken}`)
          .expect(200)

        const user = response.body

        expect(user).not.toBeInstanceOf(Array)

        expect(user).toHaveProperty('id')
        expect(typeof user.id).toBe('string')

        expect(user).toHaveProperty('email')
        expect(typeof user.email).toBe('string')

        expect(user).toHaveProperty('rol')
        expect(typeof user.rol).toBe('object')
        expect(user.rol).toHaveProperty('id')
        expect(typeof user.rol.id).toBe('string')
        expect(user.rol).toHaveProperty('nombre')
        expect(typeof user.rol.nombre).toBe('string')

        expect(user).toHaveProperty('tutorCentro')
        expect(typeof user.TutorCentro).toBeNull()

        expect(user).toHaveProperty('activo')
        expect(typeof user.activo).toBe(true)
      })
    })
  })

  describe('POST /usuarios', () => {
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
  })
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
