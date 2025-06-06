package gal.iesteis.backend.usuario;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import gal.iesteis.backend.config.security.AuthUtils;
import gal.iesteis.backend.config.security.UserDetailsImpl;

@Service
public class UsuarioService {

  @Autowired
  private UsuarioRepository repository;

  @Autowired
  private ModelMapper modelMapper;

  private UsuarioDTO usuarioADTO(Usuario usuario) {
    UsuarioDTO dto = modelMapper.map(usuario, UsuarioDTO.class);

    dto.setRol(usuario.getRol().getNombre());

    // Si .getTutor() da nulo, no da la excepción sino que simplemente asgina nulo.
    // Encadenamos .map() con funciones anónimas porque Optional funciona así
    dto.setTutor(
        Optional.ofNullable(usuario.getTutor())
            .map(tutor -> tutor.getCurso())
            .map(curso -> curso.getNombre())
            .orElse(null));

    return dto;
  }

  public List<UsuarioDTO> obtenerTodos(UserDetailsImpl userDetails) {
    if (!AuthUtils.isAdmin(userDetails)) {
      throw new UsuarioForbiddenException();
    }

    List<Usuario> usuarios = repository.findAll();
    return usuarios.stream().map(usuario -> usuarioADTO(usuario)).toList();
  }

  public Usuario obtenerUsuarioPorId(Long id) {
    return repository.findById(id).orElseThrow(() -> new UsuarioNotFoundException(id));
  }

  public UsuarioDTO obtenerPorId(UserDetailsImpl userDetails, Long id) {
    if (!AuthUtils.isAdmin(userDetails)) {
      throw new UsuarioForbiddenException();
    }

    Usuario usuario = obtenerUsuarioPorId(id);
    return usuarioADTO(usuario);
  }

  public UsuarioDTO obtenerMisDatos(UserDetailsImpl userDetails) {
    Long id = userDetails.getId();
    Usuario usuario = obtenerUsuarioPorId(id);
    return usuarioADTO(usuario);
  }
}
