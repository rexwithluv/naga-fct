package gal.iesteis.backend.estadoAlumno;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EstadoAlumnoRepository extends JpaRepository<EstadoAlumno, Byte> {
    EstadoAlumno findByNombre(String nombre);
}
