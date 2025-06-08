package gal.iesteis.backend.tutorCentro;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import gal.iesteis.backend.config.security.AuthUtils;
import gal.iesteis.backend.config.security.UserDetailsImpl;
import gal.iesteis.backend.curso.Curso;
import gal.iesteis.backend.curso.CursoService;
import gal.iesteis.backend.tutorCentro.dto.TutorCentroDTO;
import gal.iesteis.backend.tutorCentro.dto.TutorCentroDTOCreate;
import gal.iesteis.backend.tutorCentro.exceptions.TutorCentroForbiddenException;
import gal.iesteis.backend.tutorCentro.exceptions.TutorCentroNotFoundException;
import gal.iesteis.backend.usuario.Usuario;
import gal.iesteis.backend.usuario.UsuarioService;

@Service
public class TutorCentroService {

  @Autowired
  private TutorCentroDTOConverter dtoConverter;

  @Autowired
  private TutorCentroRepository repository;

  @Autowired
  private CursoService cursoService;

  @Lazy
  @Autowired
  private UsuarioService usuarioService;

  public List<TutorCentroDTO> obtenerTodos(UserDetailsImpl userDetails) {
    if (!AuthUtils.isAdmin(userDetails)) {
      throw new TutorCentroForbiddenException();
    }

    List<TutorCentro> tutores = repository.findAll();
    return tutores.stream().map(tutor -> dtoConverter.tutorCentroADtoResponseAdmin(tutor)).toList();
  }

  @Transactional
  public TutorCentro obtenerTutorCentroPorid(Long id) {
    return repository.findById(id).orElseThrow(() -> new TutorCentroNotFoundException(id));
  }

  public TutorCentroDTO obtenerPorId(UserDetailsImpl userDetails, Long id) {
    if (!AuthUtils.isAdmin(userDetails)) {
      throw new TutorCentroForbiddenException();
    }

    TutorCentro tutor = obtenerTutorCentroPorid(id);
    return dtoConverter.tutorCentroADtoResponseAdmin(tutor);
  }

  public List<TutorCentroDTO> obtenerTodosSelect(Optional<String> nombre) {
    if (nombre.isEmpty()) {
      List<TutorCentro> tutoresActivos = repository.findByActivoTrue();
      return tutoresActivos.stream()
          .map(t -> dtoConverter.tutorCentroADtoResponseSelect(t))
          .toList();
    }
    List<TutorCentro> tutoresFiltrados = repository.findByActivoTrueAndNombreContaining(nombre.get());
    return tutoresFiltrados.stream()
        .map(t -> dtoConverter.tutorCentroADtoResponseSelect(t))
        .toList();
  }

  public TutorCentro asignarUsuarioATutor(Long tutorCentroId, Long usuarioId) {
    TutorCentro tutor = obtenerTutorCentroPorid(tutorCentroId);
    Usuario usuario = usuarioService.obtenerUsuarioPorId(usuarioId);
    tutor.setUsuario(usuario);
    return repository.save(tutor);
  }

  public TutorCentroDTO crearTutorCentro(UserDetailsImpl userDetails, TutorCentroDTOCreate dto) {
    final Long usuarioId = dto.getUsuarioId();
    Usuario usuario = usuarioId != null ? usuarioService.obtenerUsuarioPorId(usuarioId) : null;
    Curso curso = cursoService.obtenerCursoPorId(dto.getCursoId());

    TutorCentro nuevoTutorCentro = repository.save(dtoConverter.dtoCreateATutorCentro(dto, curso, usuario));
    return dtoConverter.tutorCentroADtoResponseAdmin(nuevoTutorCentro);
  }
}
