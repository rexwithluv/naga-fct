package gal.iesteis.backend.fct.dto;

import java.time.LocalDate;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class FCTDTOResponseAdmin extends FCTDTO {
  private Long id;
  private Map<String, Object> alumno;
  private Map<String, Object> empresa;
  private Map<String, Object> tutorCentro;
  private Map<String, Object> tutorEmpresa;
  private LocalDate fechaInicio;
  private LocalDate fechaFin;
}
