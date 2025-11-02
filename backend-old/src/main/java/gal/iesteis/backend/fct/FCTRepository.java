package gal.iesteis.backend.fct;

import gal.iesteis.backend.alumno.Alumno;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FCTRepository extends JpaRepository<FCT, Long> {
  List<FCT> findByAlumnoIn(List<Alumno> alumnos);
}
