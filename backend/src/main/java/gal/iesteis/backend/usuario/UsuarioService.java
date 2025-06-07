package gal.iesteis.backend.usuario;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import gal.iesteis.backend.config.security.AuthUtils;
import gal.iesteis.backend.config.security.UserDetailsImpl;
import gal.iesteis.backend.rolUsuario.RolUsuario;
import gal.iesteis.backend.rolUsuario.RolUsuarioService;
import gal.iesteis.backend.tutorCentro.TutorCentro;
import gal.iesteis.backend.tutorCentro.TutorCentroService;
import gal.iesteis.backend.usuario.dto.UsuarioDTO;
import gal.iesteis.backend.usuario.dto.UsuarioDTOCreate;
import gal.iesteis.backend.usuario.exceptions.UsuarioForbiddenException;
import gal.iesteis.backend.usuario.exceptions.UsuarioNotFoundException;

@Service
public class UsuarioService {

  @Autowired
  private UsuarioRepository repository;

  @Autowired
  private UsuarioDTOConverter dtoConverter;

  @Autowired
  private RolUsuarioService rolUsuarioService;

  @Lazy
  @Autowired
  private TutorCentroService tutorCentroService;

  public List<UsuarioDTO> obtenerTodos(UserDetailsImpl userDetails) {
    if (!AuthUtils.isAdmin(userDetails)) {
      throw new UsuarioForbiddenException();
    }

    List<Usuario> usuarios = repository.findAll();
    return usuarios.stream().map(usuario -> dtoConverter.usuarioADtoResponseAdmin(usuario)).toList();
  }

  public Usuario obtenerUsuarioPorId(Long id) {
    return repository.findById(id).orElseThrow(() -> new UsuarioNotFoundException(id));
  }

  public UsuarioDTO obtenerPorId(UserDetailsImpl userDetails, Long id) {
    if (!AuthUtils.isAdmin(userDetails)) {
      throw new UsuarioForbiddenException();
    }

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
    TutorCentro tutorCentro = tutorId != null ? tutorCentroService.obtenerTutorCentroPorid(dto.getTutorId()) : null;

    RolUsuario rolUsuario = rolUsuarioService.obtenerRolUsuarioPorId(dto.getRolId());

    Usuario nuevoUsuario = dtoConverter.dtoAUsuario(dto, tutorCentro, rolUsuario);
    Usuario usuarioGuardado = repository.save(nuevoUsuario);

    return dtoConverter.usuarioADtoResponseAdmin(usuarioGuardado);
  }
}
