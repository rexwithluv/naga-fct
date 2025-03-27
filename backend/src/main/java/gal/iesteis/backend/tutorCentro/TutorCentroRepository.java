package gal.iesteis.backend.tutorCentro;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TutorCentroRepository extends JpaRepository<TutorCentro, Long> {

}
