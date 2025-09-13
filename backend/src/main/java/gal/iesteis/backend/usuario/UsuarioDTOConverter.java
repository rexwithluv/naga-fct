package gal.iesteis.backend.usuario;

import gal.iesteis.backend.rolUsuario.RolUsuario;
import gal.iesteis.backend.tutorCentro.TutorCentro;
import gal.iesteis.backend.usuario.dto.UsuarioDTO;
import gal.iesteis.backend.usuario.dto.UsuarioDTOCreate;
import gal.iesteis.backend.usuario.dto.UsuarioDTOResponseAdmin;
import java.util.Map;
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

    RolUsuario rol = usuario.getRol();
    dto.setRol(Map.of("id", rol.getId(), "nombre", rol.getNombre()));

    // Si .getTutorCentro() da nulo, no da la excepción sino que simplemente asgina
    // nulo.
    // Encadenamos .map() con funciones anónimas porque Optional funciona así
    TutorCentro tutor = usuario.getTutorCentro();
    if (tutor != null) {
      dto.setTutorCentro(
          Map.of(
              "id", tutor.getId(), "nombre", tutor.getNombre(), "apellidos", tutor.getApellidos()));
    }

    return dto;
  }

  public Usuario dtoAUsuario(UsuarioDTOCreate dto, TutorCentro tutorCentro, RolUsuario rolUsuario) {
    Usuario usuario = new Usuario();

    usuario.setEmail(dto.getEmail());
    usuario.setPassword(passwordEncoder.encode("renaido"));
    usuario.setRol(rolUsuario);
    usuario.setActivo(true);
    usuario.setTutorCentro(tutorCentro);

    return usuario;
  }
}
