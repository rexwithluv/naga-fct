package gal.iesteis.backend.curso.dto;

import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CursoDtoGetAdmin extends CursoDto {
  private Short id;
  private String codigo;
  private String nombre;
  private Map<String, Object> especialidad;
  private Map<String, Object> tutorCentro;
}
