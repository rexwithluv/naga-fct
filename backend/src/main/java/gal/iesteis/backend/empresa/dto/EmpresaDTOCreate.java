package gal.iesteis.backend.empresa.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.Map;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class EmpresaDTOCreate extends EmpresaDTO {
  @NotBlank(message = "El nombre de la empresa no puede estar vacío.")
  private String nombre;

  @NotNull(message = "El concello no puede ser nulo.")
  private Integer concello;

  @NotBlank(message = "La dirección no puede estar vacía.")
  private String direccion;

  private String observaciones;

  private Map<String, String> contacto;

  @NotNull(message = "El estado de activa no puede ser nulo.")
  private boolean activa;

  @NotNull(message = "El número de plazas no puede ser nulo.")
  private Byte plazas;

  private Set<Integer> skills;

  @NotNull(message = "La especialidad no puede ser nula.")
  private Byte especialidad;
}
