package gal.iesteis.backend.usuario.dto;

import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UsuarioDTOResponseAdmin extends UsuarioDTO {
  private Long id;
  private String email;
  private Map<String, Object> rol;
  private Map<String, Object> tutorCentro;
  private boolean activo;
}
