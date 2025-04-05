package gal.iesteis.backend.alumno;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlumnoRepository extends JpaRepository<Alumno, Long> {
    // SELECT * FROM `alumnos` WHERE tutor_centro_id = 1 AND estado_id = 1;
    List<Alumno> findByTutorCentroIdAndEstadoId(Long tutorCentroId, byte estadoId);
}
