package gal.iesteis.backend.alumno.dto;

import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AlumnoDTOResponseAdmin extends AlumnoDTO {
  private Long id;
  private String dniNie;
  private String nombre;
  private String apellidos;
  private String email;
  private String telefono;
  private Map<String, Object> concello;
  private String numeroSeguridadSocial;
  private Map<String, Object> estado;
  private Map<String, Object> tutorCentro;
}
