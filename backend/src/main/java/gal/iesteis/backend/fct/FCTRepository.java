package gal.iesteis.backend.fct;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import gal.iesteis.backend.alumno.Alumno;

@Repository
public interface FCTRepository extends JpaRepository<FCT, Long> {
    List<FCT> findByAlumnoIn(List<Alumno> alumnos);

}
