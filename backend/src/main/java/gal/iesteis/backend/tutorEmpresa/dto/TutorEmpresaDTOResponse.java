package gal.iesteis.backend.tutorEmpresa.dto;

import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
// Hay un único DTO Response porque tanto administradores como usuarios comúnes
// necesitan saber la misma información
public class TutorEmpresaDTOResponse extends TutorEmpresaDTO {
  private Long id;
  private Map<String, Object> empresa;
  private String nombre;
  private String apellidos;
  private String email;
  private String telefono;
}
