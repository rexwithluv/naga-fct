package gal.iesteis.backend.tutorCentro;

import gal.iesteis.backend.config.security.AuthUtils;
import gal.iesteis.backend.config.security.UserDetailsImpl;
import gal.iesteis.backend.tutorCentro.dto.TutorCentroDTO;
import gal.iesteis.backend.tutorCentro.exceptions.TutorCentroForbiddenException;
import gal.iesteis.backend.tutorCentro.exceptions.TutorCentroNotFoundException;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TutorCentroService {

  @Autowired
  private TutorCentroDTOConverter dtoConverter;

  @Autowired
  private TutorCentroRepository repository;

  public List<TutorCentroDTO> obtenerTodos(UserDetailsImpl userDetails) {
    if (!AuthUtils.isAdmin(userDetails)) {
      throw new TutorCentroForbiddenException();
    }

    List<TutorCentro> tutores = repository.findAll();
    return tutores.stream().map(tutor -> dtoConverter.tutorCentroADTOResponseAdmin(tutor)).toList();
  }

  public TutorCentro obtenerTutorCentroPorid(Long id) {
    return repository.findById(id).orElseThrow(() -> new TutorCentroNotFoundException(id));
  }

  public TutorCentroDTO obtenerPorId(UserDetailsImpl userDetails, Long id) {
    if (!AuthUtils.isAdmin(userDetails)) {
      throw new TutorCentroForbiddenException();
    }

    TutorCentro tutor = obtenerTutorCentroPorid(id);
    return dtoConverter.tutorCentroADTOResponseAdmin(tutor);
  }

  public List<TutorCentroDTO> obtenerTodosSelect(Optional<String> nombre) {
    if (nombre.isEmpty()) {
      List<TutorCentro> tutoresActivos = repository.findByActivoTrue();
      return tutoresActivos.stream()
          .map(t -> dtoConverter.tutorCentroADTOResponseSelect(t))
          .toList();
    }
    List<TutorCentro> tutoresFiltrados = repository.findByActivoTrueAndNombreContaining(nombre.get());
    return tutoresFiltrados.stream()
        .map(t -> dtoConverter.tutorCentroADTOResponseSelect(t))
        .toList();
  }
}
