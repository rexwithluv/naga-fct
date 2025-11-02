package gal.iesteis.backend.curso;

import gal.iesteis.backend.curso.dto.CursoDto;
import gal.iesteis.backend.curso.dto.CursoDtoConverter;
import gal.iesteis.backend.curso.exceptions.CursoNotFoundException;
import gal.iesteis.backend.tutorCentro.TutorCentroService;
import java.util.List;
import java.util.Optional;
import org.hibernate.validator.internal.util.stereotypes.Lazy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CursoService {

  @Autowired private CursoRepository repository;

  @Lazy @Autowired private TutorCentroService tutorCentroService;

  @Autowired private CursoDtoConverter dtoConverter;

  public List<? extends CursoDto> getAll(Optional<Boolean> hasTutorCentro) {
    List<Curso> cursos;
    if (hasTutorCentro.isPresent()) {
      cursos =
          hasTutorCentro.get()
              ? repository.findByTutorCentroIsNotNull()
              : repository.findByTutorCentroIsNull();

      return cursos.stream().map(curso -> dtoConverter.cursoToDtoGetAdmin(curso)).toList();
    }

    return repository.findAll().stream()
        .map(curso -> dtoConverter.cursoToDtoGetAdmin(curso))
        .toList();
  }

  public Curso getCursoById(Short id) {
    return repository.findById(id).orElseThrow(() -> new CursoNotFoundException(id));
  }
}
