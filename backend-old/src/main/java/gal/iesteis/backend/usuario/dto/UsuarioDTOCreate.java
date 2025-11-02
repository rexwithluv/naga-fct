package gal.iesteis.backend.usuario.dto;

import io.micrometer.common.lang.Nullable;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UsuarioDTOCreate extends UsuarioDTO {
  @NotBlank(message = "El email no puede estar vacío.")
  @Email(message = "El formato del email no es válido.")
  private String email;

  @NotNull(message = "El ID de rol no puede ser nulo.")
  private Byte rol;

  @Nullable
  private Long tutorCentro;

  @NotNull
  private Boolean activo;
}
