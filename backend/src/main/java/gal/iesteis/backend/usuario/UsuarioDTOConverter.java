package gal.iesteis.backend.usuario;

import gal.iesteis.backend.rolUsuario.RolUsuario;
import gal.iesteis.backend.tutorCentro.TutorCentro;
import gal.iesteis.backend.usuario.dto.UsuarioDTO;
import gal.iesteis.backend.usuario.dto.UsuarioDTOCreate;
import gal.iesteis.backend.usuario.dto.UsuarioDTOResponseAdmin;
import java.util.Optional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class UsuarioDTOConverter {

  @Autowired private PasswordEncoder passwordEncoder;

  @Autowired private ModelMapper modelMapper;

  public UsuarioDTO usuarioADtoResponseAdmin(Usuario usuario) {
    UsuarioDTOResponseAdmin dto = modelMapper.map(usuario, UsuarioDTOResponseAdmin.class);

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

  public Usuario dtoAUsuario(UsuarioDTOCreate dto, TutorCentro tutorCentro, RolUsuario rolUsuario) {
    Usuario usuario = new Usuario();

    usuario.setEmail(dto.getEmail());
    usuario.setPassword(passwordEncoder.encode("renaido"));
    usuario.setRol(rolUsuario);
    usuario.setActivo(true);
    usuario.setTutor(tutorCentro);

    return usuario;
  }
}
