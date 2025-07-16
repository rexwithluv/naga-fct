package gal.iesteis.backend.usuario;

import gal.iesteis.backend.config.security.AuthUtils;
import gal.iesteis.backend.config.security.UserDetailsImpl;
import gal.iesteis.backend.rolUsuario.RolUsuario;
import gal.iesteis.backend.rolUsuario.RolUsuarioService;
import gal.iesteis.backend.tutorCentro.TutorCentro;
import gal.iesteis.backend.tutorCentro.TutorCentroService;
import gal.iesteis.backend.usuario.dto.UsuarioDTO;
import gal.iesteis.backend.usuario.dto.UsuarioDTOCreate;
import gal.iesteis.backend.usuario.exceptions.UsuarioConflictException;
import gal.iesteis.backend.usuario.exceptions.UsuarioForbiddenException;
import gal.iesteis.backend.usuario.exceptions.UsuarioNotFoundException;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UsuarioService {

  @Autowired private UsuarioRepository repository;

  @Autowired private UsuarioDTOConverter dtoConverter;

  @Autowired private RolUsuarioService rolUsuarioService;

  @Lazy @Autowired private TutorCentroService tutorCentroService;

  public List<UsuarioDTO> obtenerTodos(
      UserDetailsImpl userDetails, Optional<Boolean> hasTutorCentro) {
    if (!AuthUtils.isAdmin(userDetails)) {
      throw new UsuarioForbiddenException();
    }

    List<Usuario> usuarios;
    if (hasTutorCentro.isPresent()) {
      if (hasTutorCentro.get()) {
        usuarios = repository.findByTutorCentroIsNotNull();
      }
      usuarios = repository.findByTutorCentroIsNull();
    } else {
      usuarios = repository.findAll();
    }

    return usuarios.stream()
        .map(usuario -> dtoConverter.usuarioADtoResponseAdmin(usuario))
        .toList();
  }

  public Usuario obtenerUsuarioPorId(Long id) {

    return repository.findById(id).orElseThrow(() -> new UsuarioNotFoundException(id));
  }

  public UsuarioDTO obtenerPorId(Long id) {

    Usuario usuario = obtenerUsuarioPorId(id);
    return dtoConverter.usuarioADtoResponseAdmin(usuario);
  }

  public UsuarioDTO obtenerMisDatos(UserDetailsImpl userDetails) {
    Long id = userDetails.getId();
    Usuario usuario = obtenerUsuarioPorId(id);
    return dtoConverter.usuarioADtoResponseAdmin(usuario);
  }

  // Necesitamos poner @Transactional en varios puntos del código que intervienen
  // aquí porque necesitamos que todo se ejecute en una sola transacción a nivel
  // DB. Sin la anotación, Hibernate realiza varias operaciones que pueden dejar
  // en este caso la DB en un estado inconsistente
  @Transactional
  public UsuarioDTO crearUsuario(UsuarioDTOCreate dto) {
    final Long tutorId = dto.getTutorId();
    TutorCentro tutorCentro = null;
    if (tutorId != null) {
      tutorCentro = tutorCentroService.obtenerTutorCentroPorid(dto.getTutorId());
      if (tutorCentro.getUsuario() != null) {
        throw new UsuarioConflictException();
      }
    }

    RolUsuario rolUsuario = rolUsuarioService.obtenerRolUsuarioPorId(dto.getRolId());
    Usuario nuevoUsuario = dtoConverter.dtoAUsuario(dto, tutorCentro, rolUsuario);
    Usuario usuarioGuardado = repository.save(nuevoUsuario);

    if (tutorCentro != null) {
      tutorCentroService.asignarUsuarioATutor(tutorId, usuarioGuardado.getId());
    }

    return dtoConverter.usuarioADtoResponseAdmin(usuarioGuardado);
  }

  @Transactional
  public UsuarioDTO updateUsuario(UserDetailsImpl userDetails, UsuarioDTOCreate dto, Long id) {
    TutorCentro tutorCentro = null;
    if (dto.getTutorId() != null) {
      tutorCentro = tutorCentroService.obtenerTutorCentroPorid(dto.getTutorId());
    }

    RolUsuario rolUsuario = rolUsuarioService.obtenerRolUsuarioPorId(dto.getRolId());
    Usuario usuario = dtoConverter.dtoAUsuario(dto, tutorCentro, rolUsuario);

    usuario.setId(id);
    usuario = repository.save(usuario);
    return dtoConverter.usuarioADtoResponseAdmin(usuario);
  }

  @Transactional
  public void deleteUsuario(Long id) {
    Usuario usuario = obtenerUsuarioPorId(id);
    usuario.setActivo(false);
    repository.save(usuario);
  }
}
