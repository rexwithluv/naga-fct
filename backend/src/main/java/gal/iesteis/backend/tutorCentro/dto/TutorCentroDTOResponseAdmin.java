package gal.iesteis.backend.tutorCentro.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class TutorCentroDTOResponseAdmin extends TutorCentroDTO {
  private Long id;
  private String nombre;
  private String apellidos;
  private String email;
  private String curso;
  private boolean activo;
}
