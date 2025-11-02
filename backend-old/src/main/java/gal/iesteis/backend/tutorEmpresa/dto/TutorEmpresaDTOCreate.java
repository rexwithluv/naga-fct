package gal.iesteis.backend.tutorEmpresa.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class TutorEmpresaDTOCreate extends TutorEmpresaDTO {
  @NotNull(message = "El ID de la empresa no puede ser nulo.")
  private Long empresa;

  @NotBlank(message = "El nombre no puede estar vacío.")
  private String nombre;

  @NotBlank(message = "Los apellidos no pueden estar vacíos.")
  private String apellidos;

  @NotBlank(message = "El email no puede estar vacío.")
  @Email(message = "El formato del email no es válido.")
  private String email;

  @NotBlank(message = "El teléfono no puede estar vacío.")
  private String telefono;
}
