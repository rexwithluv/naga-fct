package gal.iesteis.backend.tutorCentro;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TutorCentroRepository extends JpaRepository<TutorCentro, Long> {
  List<TutorCentro> findByActivoTrue();

  List<TutorCentro> findByActivoTrueAndNombreContaining(String nombre);
}
