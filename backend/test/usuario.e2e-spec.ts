import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import request from 'supertest'
import { App } from 'supertest/types'
import { AppModule } from '../src/app.module'
import { loginAsAdmin, loginAsStandard } from './auth-helpers'

describe('UsuarioController (e2e)', () => {
  let app: INestApplication<App>
  const endpoint = '/usuarios'
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
    it('GET /usuarios (ADMIN)', async () => {
      const response = await request(app.getHttpServer())
        .get(endpoint)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200)

      expect(response.body).toBeInstanceOf(Array)
    })

    it('GET /usuarios (STANDARD)', () => {
      return request(app.getHttpServer())
        .get(endpoint)
        .set('Authorization', `Bearer ${standardToken}`)
        .expect(403)
    })

    it('GET /usuarios (without token)', () => {
      return request(app.getHttpServer()).get(endpoint).expect(401)
    })
  })

  describe('GET /usuarios/:id', () => {
    it('GET /usuarios/:id (ADMIN) - TutorCentro', async () => {
      const response = await request(app.getHttpServer())
        .get(`${endpoint}/2`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200)

      const user = response.body

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
      expect(typeof user.tutorCentro).toBe('object')
      expect(user).toHaveProperty('nombre')
      expect(typeof user.tutorCentro.nombre).toBe('string')
      expect(user).toHaveProperty('apellidos')
      expect(typeof user.tutorCentro.apellidos).toBe('string')
      expect(user).toHaveProperty('id')
      expect(typeof user.tutorCentro.id).toBe('string')

      expect(user).toHaveProperty('activo')
      expect(typeof user.activo).toBe(true)
    })

    it('GET /usuarios/:id (ADMIN) - No TutorCentro', async () => {
      const response = await request(app.getHttpServer())
        .get(`${endpoint}/2`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200)

      const user = response.body

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
      expect(typeof user.tutorCentro).toBeNull()

      expect(user).toHaveProperty('activo')
      expect(typeof user.activo).toBe(true)
    })

    it('GET /usuarios/:id (ADMIN) - User not found', () => {
      return request(app.getHttpServer())
        .get(`${endpoint}/999999`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(404)
    })

    it('GET /usuarios/:id (Standard)', () => {
      return request(app.getHttpServer())
        .get(`${endpoint}/1`)
        .set('Authorization', `Bearer ${standardToken}`)
        .expect(403)
    })

    it('GET /usuarios/:id (without token)', () => {
      return request(app.getHttpServer()).get(`${endpoint}/1`).expect(401)
    })
  })

  describe('GET /usuarios/me', () => {
    it('GET /usuarios/me (ADMIN)', async () => {
      const response = await request(app.getHttpServer())
        .get(`${endpoint}/me`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200)

      const user = response.body

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

  describe('POST /usuarios', () => {
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
    const badUser = {
      email: `new.bad.user.${Date.now()}.gal`,
      rolId: 5,
    }

    it('POST /usuarios (ADMIN) - Create admin user', async () => {
      const response = await request(app.getHttpServer())
        .post(endpoint)
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

    it('POST /usuarios (ADMIN) - Create standard user', async () => {
      const response = await request(app.getHttpServer())
        .post(endpoint)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          newUser,
        })
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

    it('POST /usuarios (ADMIN) - Bad create request', async () => {
      return request(app.getHttpServer())
        .post(endpoint)
        .set('Authorization', `Bearer ${adminToken}`)
        .send(badUser)
        .expect(400)
    })

    it('POST /usuarios (STANDARD)', () => {
      return request(app.getHttpServer())
        .post(endpoint)
        .set('Authorization', `Bearer ${standardToken}`)
        .send(newUser)
        .expect(403)
    })

    it('POST /usuarios (without token)', () => {
      return request(app.getHttpServer()).post(endpoint).send(newUser).expect(401)
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
