package gal.iesteis.backend.tutorCentro;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TutorCentroRepository extends JpaRepository<TutorCentro, Long> {
    List<TutorCentro> findByActivoTrue();

    List<TutorCentro> findByActivoTrueAndNombreContaining(String nombre);
}
