import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import request from 'supertest'
import { App } from 'supertest/types'
import { AppModule } from '../src/app.module'
import { loginAsAdmin, loginAsStandard } from './auth-helpers'

describe('SkillController (e2e)', () => {
  let app: INestApplication<App>
  const endpoint = '/skills'
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

  describe('GET /skills', () => {
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
      it('should return an array with SkillResponseDto - admin', async () => {
        const response = await request(app.getHttpServer())
          .get(endpoint)
          .set('Authorization', `Bearer ${adminToken}`)
          .expect(200)

        expect(response.body).toBeInstanceOf(Array)

        const skill = response.body[0]

        expect(skill).toHaveProperty('id')
        expect(typeof skill.id).toBe('string')

        expect(skill).toHaveProperty('nombre')
        expect(typeof skill.nombre).toBe('string')

        expect(skill).toHaveProperty('especialidad')
        expect(typeof skill.especialidad).toBe('object')
        expect(skill.especialidad).toHaveProperty('id')
        expect(typeof skill.especialidad.id).toBe('string')
        expect(skill.especialidad).toHaveProperty('nombre')
        expect(typeof skill.especialidad.nombre).toBe('string')
      })

      it('should return an array with SkillResponseDto - standard', async () => {
        const response = await request(app.getHttpServer())
          .get(endpoint)
          .set('Authorization', `Bearer ${standardToken}`)
          .expect(200)

        expect(response.body).toBeInstanceOf(Array)

        const skill = response.body[0]

        expect(skill).toHaveProperty('id')
        expect(typeof skill.id).toBe('string')

        expect(skill).toHaveProperty('nombre')
        expect(typeof skill.nombre).toBe('string')

        expect(skill).toHaveProperty('especialidad')
        expect(typeof skill.especialidad).toBe('object')
        expect(skill.especialidad).toHaveProperty('id')
        expect(typeof skill.especialidad.id).toBe('string')
        expect(skill.especialidad).toHaveProperty('nombre')
        expect(typeof skill.especialidad.nombre).toBe('string')
      })
    })
  })
})
