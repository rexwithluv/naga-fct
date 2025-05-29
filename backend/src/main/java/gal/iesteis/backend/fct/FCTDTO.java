package gal.iesteis.backend.fct;

import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class FCTDTO {
  private Long id;
  private String alumno;
  private String empresa;
  private String tutorEmpresa;
  private LocalDate fechaInicio;
  private LocalDate fechaFin;
}
