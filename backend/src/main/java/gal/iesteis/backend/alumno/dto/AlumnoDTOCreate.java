package gal.iesteis.backend.alumno.dto;

import jakarta.annotation.Nullable;
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
public class AlumnoDTOCreate extends AlumnoDTO {
  @NotBlank(message = "El DNI/NIE no puede estar vacío.")
  private String dniNie;

  @NotBlank(message = "El nombre no puede estar vacío.")
  private String nombre;

  @NotBlank(message = "Los apellidos no pueden estar vacíos.")
  private String apellidos;

  @NotBlank(message = "El email no puede estar vacío.")
  @Email(message = "El formato del email no es válido.")
  private String email;

  @NotBlank(message = "El teléfono no puede estar vacío.")
  private String telefono;

  @NotNull(message = "El concello no puede ser nulo.")
  private Integer concello;

  @NotBlank(message = "El número de la Seguridad Social no puede estar vacío.")
  private String numeroSeguridadSocial;

  @NotNull(message = "El estado no puede ser nulo.")
  private Byte estado;

  @Nullable private Long tutorCentro;
}
