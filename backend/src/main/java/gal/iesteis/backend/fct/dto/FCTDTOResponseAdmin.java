package gal.iesteis.backend.fct.dto;

import java.time.LocalDate;
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
  private String alumno;
  private String empresa;
  private String tutorCentro;
  private String tutorEmpresa;
  private LocalDate fechaInicio;
  private LocalDate fechaFin;
}
