package gal.iesteis.backend.curso;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CursoRepository extends JpaRepository<Curso, Short> {
  List<Curso> findByTutorCentroIsNull();

  List<Curso> findByTutorCentroIsNotNull();
}
