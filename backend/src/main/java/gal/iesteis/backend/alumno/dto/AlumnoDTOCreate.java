package gal.iesteis.backend.alumno.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AlumnoDTOCreate extends AlumnoDTO {
  private String dniNie;
  private String nombre;
  private String apellidos;
  private String email;
  private String telefono;
  private Integer concello;
  private String numeroSeguridadSocial;
  private Byte estado;
  private Long tutorCentro;
}
