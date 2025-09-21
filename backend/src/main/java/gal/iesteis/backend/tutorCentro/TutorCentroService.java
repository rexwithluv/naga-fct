package gal.iesteis.backend.tutorCentro;

import gal.iesteis.backend.config.security.AuthUtils;
import gal.iesteis.backend.config.security.UserDetailsImpl;
import gal.iesteis.backend.curso.Curso;
import gal.iesteis.backend.curso.CursoService;
import gal.iesteis.backend.tutorCentro.dto.TutorCentroDTO;
import gal.iesteis.backend.tutorCentro.dto.TutorCentroDTOCreate;
import gal.iesteis.backend.tutorCentro.exceptions.TutorCentroConflictCursoAsignadoException;
import gal.iesteis.backend.tutorCentro.exceptions.TutorCentroConflictCursoException;
import gal.iesteis.backend.tutorCentro.exceptions.TutorCentroConflictInactivoException;
import gal.iesteis.backend.tutorCentro.exceptions.TutorCentroConflictUsuarioException;
import gal.iesteis.backend.tutorCentro.exceptions.TutorCentroForbiddenException;
import gal.iesteis.backend.tutorCentro.exceptions.TutorCentroNotFoundException;
import gal.iesteis.backend.usuario.Usuario;
import gal.iesteis.backend.usuario.UsuarioService;
import jakarta.transaction.Transactional;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public class TutorCentroService {

  @Autowired private TutorCentroDTOConverter dtoConverter;

  @Autowired private TutorCentroRepository repository;

  @Lazy @Autowired private CursoService cursoService;

  @Lazy @Autowired private UsuarioService usuarioService;

  public List<TutorCentroDTO> obtenerTodos(UserDetailsImpl userDetails) {
    if (!AuthUtils.isAdmin(userDetails)) {
      throw new TutorCentroForbiddenException();
    }

    List<TutorCentro> tutores = repository.findAll();
    return tutores.stream().map(tutor -> dtoConverter.tutorCentroADtoResponseAdmin(tutor)).toList();
  }

  public TutorCentro obtenerTutorCentroPorid(Long id) {
    return repository.findById(id).orElseThrow(() -> new TutorCentroNotFoundException(id));
  }

  public TutorCentroDTO obtenerPorId(Long id) {
    TutorCentro tutor = obtenerTutorCentroPorid(id);
    return dtoConverter.tutorCentroADtoResponseAdmin(tutor);
  }

  @Transactional
  public TutorCentro asignarUsuarioATutor(Long tutorCentroId, Long usuarioId) {
    TutorCentro tutor = obtenerTutorCentroPorid(tutorCentroId);
    Usuario usuario = usuarioService.obtenerUsuarioPorId(usuarioId);
    tutor.setUsuario(usuario);
    return repository.save(tutor);
  }

  @Transactional
  public TutorCentroDTO crearTutorCentro(TutorCentroDTOCreate dto) {
    final Long usuarioId = dto.getUsuario();
    Usuario usuario = null;

    if (usuarioId != null) {
      usuario = usuarioService.obtenerUsuarioPorId(usuarioId);
      if (usuario.getTutorCentro() != null) {
        throw new TutorCentroConflictUsuarioException();
      }
    }

    Curso curso = cursoService.getCursoById(dto.getCurso());
    if (curso.getTutorCentro() != null) {
      throw new TutorCentroConflictCursoAsignadoException();
    }
    TutorCentro nuevoTutorCentro =
        repository.save(dtoConverter.dtoCreateATutorCentro(dto, curso, usuario));

    if (usuario != null) {
      asignarUsuarioATutor(nuevoTutorCentro.getId(), usuarioId);
    }

    return dtoConverter.tutorCentroADtoResponseAdmin(nuevoTutorCentro);
  }

  @Transactional
  public TutorCentroDTO updateTutorCentro(
      UserDetailsImpl userDetails, @RequestBody TutorCentroDTOCreate dto, Long id) {
    Curso curso = cursoService.getCursoById(dto.getCurso());
    Usuario usuario = null;
    if (dto.getUsuario() != null) {
      usuario = usuarioService.obtenerUsuarioPorId(dto.getUsuario());
    }
    TutorCentro tutorCentro = dtoConverter.dtoCreateATutorCentro(dto, curso, usuario);
    tutorCentro.setId(id);

    tutorCentro = repository.save(tutorCentro);
    return dtoConverter.tutorCentroADtoResponseAdmin(tutorCentro);
  }

  @Transactional
  public void deleteTutorCentro(UserDetailsImpl userDetails, Long id) {
    TutorCentro tutor = obtenerTutorCentroPorid(id);

    if (tutor.getCurso() != null) {
      throw new TutorCentroConflictCursoException();
    }

    if (!tutor.getActivo()) {
      throw new TutorCentroConflictInactivoException();
    }

    tutor.setActivo(false);

    repository.save(tutor);
  }
}
