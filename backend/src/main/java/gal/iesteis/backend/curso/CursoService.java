package gal.iesteis.backend.curso;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CursoService {

  @Autowired private CursoRepository repository;

  public List<Curso> obtenerCursos(Optional<Boolean> hasTutorCurso) {
    if (hasTutorCurso.isPresent()) {
      if (hasTutorCurso.get()) {
        return repository.findByTutorCentroIsNotNull();
      }
      return repository.findByTutorCentroIsNull();
    }
    return repository.findAll();
  }

  public Curso obtenerCursoPorId(Short id) {
    return repository.findById(id).orElseThrow(() -> new CursoNotFoundException(id));
  }
}
