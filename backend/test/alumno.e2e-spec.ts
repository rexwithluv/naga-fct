import request from 'supertest'

describe('AlumnoController (e2e)', () => {
  const baseEndpoint = '/alumnos'

  describe(`GET ${baseEndpoint}`, () => {
    describe('Authorization', () => {
      it('should return 200 - admin', () => {
        return request(app.getHttpServer())
          .get(baseEndpoint)
          .set('Authorization', `Bearer ${adminToken}`)
          .expect(200)
      })

      it('should return 200 - standard', () => {
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
      it('should an array with tutorCentro field', async () => {
        const response = await request(app.getHttpServer())
          .get(baseEndpoint)
          .set('Authorization', `Bearer ${adminToken}`)
          .expect(200)

        expect(response.body).toBeInstanceOf(Array)

        const alumno = response.body[0]

        expect(alumno).toHaveProperty('id')
        expect(typeof alumno.id).toBe('string')

        expect(alumno).toHaveProperty('dniNie')
        expect(typeof alumno.dniNie).toBe('string')

        expect(alumno).toHaveProperty('nombre')
        expect(typeof alumno.nombre).toBe('string')

        expect(alumno).toHaveProperty('apellidos')
        expect(typeof alumno.apellidos).toBe('string')

        expect(alumno).toHaveProperty('email')
        expect(typeof alumno.email).toBe('string')

        expect(alumno).toHaveProperty('telefono')
        expect(typeof alumno.telefono).toBe('string')

        expect(alumno).toHaveProperty('concello')
        expect(typeof alumno.concello).toBe('object')
        expect(alumno.concello).toHaveProperty('id')
        expect(typeof alumno.concello.id).toBe('string')
        expect(alumno.concello).toHaveProperty('nombre')
        expect(typeof alumno.concello.nombre).toBe('string')

        expect(alumno).toHaveProperty('numeroSeguridadSocial')
        expect(typeof alumno.numeroSeguridadSocial).toBe('string')

        expect(alumno).toHaveProperty('estadoAlumno')
        expect(typeof alumno.estadoAlumno).toBe('object')
        expect(alumno.estadoAlumno).toHaveProperty('id')
        expect(typeof alumno.estadoAlumno.id).toBe('string')
        expect(alumno.estadoAlumno).toHaveProperty('nombre')
        expect(typeof alumno.estadoAlumno.nombre).toBe('string')

        expect(alumno).toHaveProperty('tutorCentro')
        expect(typeof alumno.tutorCentro).toBe('object')
        expect(alumno.tutorCentro).toHaveProperty('id')
        expect(typeof alumno.tutorCentro.id).toBe('string')
        expect(alumno.tutorCentro).toHaveProperty('nombre')
        expect(typeof alumno.tutorCentro.nombre).toBe('string')
        expect(alumno.tutorCentro).toHaveProperty('curso')
        expect(typeof alumno.tutorCentro.curso).toBe('object')
        expect(alumno.tutorCentro.curso).toHaveProperty('id')
        expect(typeof alumno.tutorCentro.curso.id).toBe('string')
        expect(alumno.tutorCentro.curso).toHaveProperty('codigo')
        expect(typeof alumno.tutorCentro.curso.codigo).toBe('string')
        expect(alumno.tutorCentro.curso).toHaveProperty('nombre')
        expect(typeof alumno.tutorCentro.curso.nombre).toBe('string')
        expect(alumno.tutorCentro.usuario).toHaveProperty('id')
        expect(typeof alumno.tutorCentro.usuario.id).toBe('string')
        expect(alumno.tutorCentro.usuario).toHaveProperty('email')
        expect(typeof alumno.tutorCentro.usuario.email).toBe('string')
        expect(alumno.tutorCentro.usuario).toHaveProperty('activo')
        expect(typeof alumno.tutorCentro.usuario.activo).toBe('boolean')
      })
      it('should an array without tutorCentro field', async () => {
        const response = await request(app.getHttpServer())
          .get(baseEndpoint)
          .set('Authorization', `Bearer ${standardToken}`)
          .expect(200)

        expect(response.body).toBeInstanceOf(Array)

        const alumno = response.body[0]

        expect(alumno).toHaveProperty('id')
        expect(typeof alumno.id).toBe('string')

        expect(alumno).toHaveProperty('dniNie')
        expect(typeof alumno.dniNie).toBe('string')

        expect(alumno).toHaveProperty('nombre')
        expect(typeof alumno.nombre).toBe('string')

        expect(alumno).toHaveProperty('apellidos')
        expect(typeof alumno.apellidos).toBe('string')

        expect(alumno).toHaveProperty('email')
        expect(typeof alumno.email).toBe('string')

        expect(alumno).toHaveProperty('telefono')
        expect(typeof alumno.telefono).toBe('string')

        expect(alumno).toHaveProperty('concello')
        expect(typeof alumno.concello).toBe('object')
        expect(alumno.concello).toHaveProperty('id')
        expect(typeof alumno.concello.id).toBe('string')
        expect(alumno.concello).toHaveProperty('nombre')
        expect(typeof alumno.concello.nombre).toBe('string')

        expect(alumno).toHaveProperty('numeroSeguridadSocial')
        expect(typeof alumno.numeroSeguridadSocial).toBe('string')

        expect(alumno).toHaveProperty('estadoAlumno')
        expect(typeof alumno.estadoAlumno).toBe('object')
        expect(alumno.estadoAlumno).toHaveProperty('id')
        expect(typeof alumno.estadoAlumno.id).toBe('string')
        expect(alumno.estadoAlumno).toHaveProperty('nombre')
        expect(typeof alumno.estadoAlumno.nombre).toBe('string')

        expect(alumno).not.toHaveProperty('tutorCentro')
      })
    })
  })
  describe(`GET ${baseEndpoint}/:id`, () => {
    const endpoint = `${baseEndpoint}/1`

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
      it('should return an AlumnoResponseDto with tutorCentro field', async () => {
        const response = await request(app.getHttpServer())
          .get(endpoint)
          .set('Authorization', `Bearer ${adminToken}`)
          .expect(200)

        const alumno = response.body

        expect(alumno).toHaveProperty('id')
        expect(typeof alumno.id).toBe('string')

        expect(alumno).toHaveProperty('dniNie')
        expect(typeof alumno.dniNie).toBe('string')

        expect(alumno).toHaveProperty('nombre')
        expect(typeof alumno.nombre).toBe('string')

        expect(alumno).toHaveProperty('apellidos')
        expect(typeof alumno.apellidos).toBe('string')

        expect(alumno).toHaveProperty('email')
        expect(typeof alumno.email).toBe('string')

        expect(alumno).toHaveProperty('telefono')
        expect(typeof alumno.telefono).toBe('string')

        expect(alumno).toHaveProperty('concello')
        expect(typeof alumno.concello).toBe('object')
        expect(alumno.concello).toHaveProperty('id')
        expect(typeof alumno.concello.id).toBe('string')
        expect(alumno.concello).toHaveProperty('nombre')
        expect(typeof alumno.concello.nombre).toBe('string')

        expect(alumno).toHaveProperty('numeroSeguridadSocial')
        expect(typeof alumno.numeroSeguridadSocial).toBe('string')

        expect(alumno).toHaveProperty('estadoAlumno')
        expect(typeof alumno.estadoAlumno).toBe('object')
        expect(alumno.estadoAlumno).toHaveProperty('id')
        expect(typeof alumno.estadoAlumno.id).toBe('string')
        expect(alumno.estadoAlumno).toHaveProperty('nombre')
        expect(typeof alumno.estadoAlumno.nombre).toBe('string')

        expect(alumno).toHaveProperty('tutorCentro')
        expect(typeof alumno.tutorCentro).toBe('object')
        expect(alumno.tutorCentro).toHaveProperty('id')
        expect(typeof alumno.tutorCentro.id).toBe('string')
        expect(alumno.tutorCentro).toHaveProperty('nombre')
        expect(typeof alumno.tutorCentro.nombre).toBe('string')

        // id, codigo, nombre
        expect(alumno).toHaveProperty('curso')
        expect(typeof alumno.curso).toBe('object')
        expect(alumno.curso).toHaveProperty('id')
        expect(typeof alumno.curso.id).toBe('string')
        expect(alumno.curso).toHaveProperty('nombre')
        expect(typeof alumno.curso.nombre).toBe('string')
        expect(alumno.curso).toHaveProperty('codigo')
        expect(typeof alumno.curso.codigo).toBe('string')
      })
      it('should return an AlumnoResponseDto without tutorCentro field', async () => {
        const response = await request(app.getHttpServer())
          .get(endpoint)
          .set('Authorization', `Bearer ${standardToken}`)
          .expect(200)

        const alumno = response.body

        expect(alumno).toHaveProperty('id')
        expect(typeof alumno.id).toBe('string')

        expect(alumno).toHaveProperty('dniNie')
        expect(typeof alumno.dniNie).toBe('string')

        expect(alumno).toHaveProperty('nombre')
        expect(typeof alumno.nombre).toBe('string')

        expect(alumno).toHaveProperty('apellidos')
        expect(typeof alumno.apellidos).toBe('string')

        expect(alumno).toHaveProperty('email')
        expect(typeof alumno.email).toBe('string')

        expect(alumno).toHaveProperty('telefono')
        expect(typeof alumno.telefono).toBe('string')

        expect(alumno).toHaveProperty('concello')
        expect(typeof alumno.concello).toBe('object')
        expect(alumno.concello).toHaveProperty('id')
        expect(typeof alumno.concello.id).toBe('string')
        expect(alumno.concello).toHaveProperty('nombre')
        expect(typeof alumno.concello.nombre).toBe('string')

        expect(alumno).toHaveProperty('numeroSeguridadSocial')
        expect(typeof alumno.numeroSeguridadSocial).toBe('string')

        expect(alumno).toHaveProperty('estadoAlumno')
        expect(typeof alumno.estadoAlumno).toBe('object')
        expect(alumno.estadoAlumno).toHaveProperty('id')
        expect(typeof alumno.estadoAlumno.id).toBe('string')
        expect(alumno.estadoAlumno).toHaveProperty('nombre')
        expect(typeof alumno.estadoAlumno.nombre).toBe('string')

        expect(alumno).not.toHaveProperty('tutorCentro')
      })
    })
    describe('Errors', () => {
      const forbiddenEndpoint = `${baseEndpoint}/5`
      const notFoundEndpoint = `${baseEndpoint}/9999`

      it('should return 403, standard user dont see others alumnos', async () => {
        return request(app.getHttpServer())
          .get(forbiddenEndpoint)
          .set('Authorization', `Bearer ${standardToken}`)
          .expect(403)
      })
      it('should return 404', () => {
        return request(app.getHttpServer())
          .get(notFoundEndpoint)
          .set('Authorization', `Bearer ${standardToken}`)
          .expect(404)
      })
    })
  })

  // describe(`POST ${baseEndpoint}`, () => {
  //   describe('Authorization', () => {
  //     it('should return 201 - admin', () => {})
  //     it('should return 201 - standard', () => {})
  //     it('should return 401 - without token', () => {})
  //   })
  //   describe('Response', () => {
  //     it('should return AlumnoResponseDto with TutorCentro field - admin', () => {})
  //     it('should return AlumnoResponseDto without TutorCentro field - standard', () => {})
  //   })
  //   describe('Errors', () => {
  //     it('should return 403 trying to create Alumno in another Curso that not my own - standard', () => {})
  //   })
  // })

  // describe(`PUT ${baseEndpoint}/:id`, () => {
  //   describe('Authorization', () => {
  //     it('should return 201 - admin', () => {})
  //     it('should return 201 - standard', () => {})
  //     it('should return 401 - without token', () => {})
  //   })
  //   describe('Response', () => {
  //     it('should return AlumnoResponseDto with TutorCentro field - admin', () => {})
  //     it('should return AlumnoResponseDto without TutorCentro field - standard', () => {})
  //   })
  //   describe('Errors', () => {
  //     it('should return 403 trying to update Alumno in another Curso that not my own - standard', () => {})
  //   })
  // })

  // describe(`DELETE ${baseEndpoint}/id`, () => {
  //   describe('Authorization', () => {
  //     it('should return 204 - admin', () => {})
  //     it('should return 204 - standard', () => {})
  //     it('should return 401 - without token', () => {})
  //   })
  //   describe('Errors', () => {
  //     it('should return 403 trying to delete Alumno in another Curso that not my own - standard', () => {})
  //   })
  // })
})
