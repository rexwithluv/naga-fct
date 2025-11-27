import { INestApplication } from '@nestjs/common'
import request from 'supertest'

async function loginAsAdmin(app: INestApplication): Promise<string> {
  const response = await request(app.getHttpServer())
    .post('/login')
    .send({ email: 'admin@edu.xunta.gal', password: 'abc123.' })

  const token: string = response.body.access_token
  return `Bearer ${token}`
}

async function loginAsStandard(app: INestApplication): Promise<string> {
  const response = await request(app.getHttpServer())
    .post('/login')
    .send({ email: 'patricia@edu.xunta.gal', password: 'springboot' })

  const token: string = response.body.access_token
  return `Bearer ${token}`
}

export { loginAsAdmin, loginAsStandard }
