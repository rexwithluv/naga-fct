package gal.iesteis.backend.estadoAlumno;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EstadoAlumnoRepository extends JpaRepository<EstadoAlumno, Byte> {
  Optional<EstadoAlumno> findByNombre(String string);
}
