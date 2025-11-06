import request from 'supertest'

describe('EmpresaController (e2e)', () => {
  const endpoint = '/empresas'

  describe('GET /empresas', () => {
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
      it('should return an array with especialidad - admin', async () => {
        const response = await request(app.getHttpServer())
          .get(endpoint)
          .set('Authorization', `Bearer ${adminToken}`)
          .expect(200)

        expect(response.body).toBeInstanceOf(Array)

        const empresa = response.body[0]

        expect(empresa).toHaveProperty('id')
        expect(typeof empresa.id).toBe('string')

        expect(empresa).toHaveProperty('nombre')
        expect(typeof empresa.nombre).toBe('string')

        expect(empresa).toHaveProperty('concello')
        expect(typeof empresa.concello).toBe('object')
        expect(empresa.concello).toHaveProperty('id')
        expect(typeof empresa.concello.id).toBe('string')
        expect(empresa.concello).toHaveProperty('nombre')
        expect(typeof empresa.concello.nombre).toBe('string')

        expect(empresa).toHaveProperty('direccion')
        expect(typeof empresa.direccion).toBe('string')

        expect(empresa).toHaveProperty('observaciones')
        expect(typeof empresa.observaciones).toBe('string')

        expect(empresa).toHaveProperty('contacto')
        expect(typeof empresa.contacto).toBe('object')
        expect(empresa.contacto).toHaveProperty('telefono')
        expect(typeof empresa.contacto.telefono).toBe('string')
        expect(empresa.contacto).toHaveProperty('nombre')
        expect(typeof empresa.contacto.nombre).toBe('string')
        expect(empresa.contacto).toHaveProperty('email')
        expect(typeof empresa.contacto.email).toBe('string')

        expect(empresa).toHaveProperty('activa')
        expect(typeof empresa.activa).toBe('boolean')

        expect(empresa).toHaveProperty('plazas')
        expect(typeof empresa.plazas).toBe('number')

        expect(empresa).toHaveProperty('skills')
        expect(empresa.skills).toBeInstanceOf(Array)

        if (empresa.skills.length !== 0) {
          const skill = empresa.skills[0]

          expect(skill).toHaveProperty('id')
          expect(typeof skill.id).toBe('string')
          expect(skill).toHaveProperty('nombre')
          expect(typeof skill.nombre).toBe('string')
        }

        expect(empresa).toHaveProperty('especialidad')
        expect(typeof empresa.especialidad).toBe('object')
        expect(empresa.especialidad).toHaveProperty('id')
        expect(typeof empresa.especialidad.id).toBe('string')
        expect(empresa.especialidad).toHaveProperty('nombre')
        expect(typeof empresa.especialidad.nombre).toBe('string')
      })

      it('should return an array without especialidad - standard', async () => {
        const response = await request(app.getHttpServer())
          .get(endpoint)
          .set('Authorization', `Bearer ${standardToken}`)
          .expect(200)

        expect(response.body).toBeInstanceOf(Array)

        const empresa = response.body[0]

        expect(empresa).toHaveProperty('id')
        expect(typeof empresa.id).toBe('string')

        expect(empresa).toHaveProperty('nombre')
        expect(typeof empresa.nombre).toBe('string')

        expect(empresa).toHaveProperty('concello')
        expect(typeof empresa.concello).toBe('object')
        expect(empresa.concello).toHaveProperty('id')
        expect(typeof empresa.concello.id).toBe('string')
        expect(empresa.concello).toHaveProperty('nombre')
        expect(typeof empresa.concello.nombre).toBe('string')

        expect(empresa).toHaveProperty('direccion')
        expect(typeof empresa.direccion).toBe('string')

        expect(empresa).toHaveProperty('observaciones')
        expect(typeof empresa.observaciones).toBe('string')

        expect(empresa).toHaveProperty('contacto')
        expect(typeof empresa.contacto).toBe('object')
        expect(empresa.contacto).toHaveProperty('telefono')
        expect(typeof empresa.contacto.telefono).toBe('string')
        expect(empresa.contacto).toHaveProperty('nombre')
        expect(typeof empresa.contacto.nombre).toBe('string')
        expect(empresa.contacto).toHaveProperty('email')
        expect(typeof empresa.contacto.email).toBe('string')

        expect(empresa).toHaveProperty('activa')
        expect(typeof empresa.activa).toBe('boolean')

        expect(empresa).toHaveProperty('plazas')
        expect(typeof empresa.plazas).toBe('number')

        expect(empresa).toHaveProperty('skills')
        expect(empresa.skills).toBeInstanceOf(Array)

        if (empresa.skills.length !== 0) {
          const skill = empresa.skills[0]

          expect(skill).toHaveProperty('id')
          expect(typeof skill.id).toBe('string')
          expect(skill).toHaveProperty('nombre')
          expect(typeof skill.nombre).toBe('string')
        }

        expect(empresa).not.toHaveProperty('especialidad')
      })
    })
  })
})
