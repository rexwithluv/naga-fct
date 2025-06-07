package gal.iesteis.backend.usuario.dto;

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
    private String rol;
    private String tutor;
    private boolean activo;
}
