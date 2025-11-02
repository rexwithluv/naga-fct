package gal.iesteis.backend.alumno;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlumnoRepository extends JpaRepository<Alumno, Long> {
  List<Alumno> findByTutorCentroId(Long id);
}
