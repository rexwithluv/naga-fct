package gal.iesteis.backend.fct.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class FCTDTOCreate extends FCTDTO {
  @NotNull(message = "El ID de alumno no puede ser nulo.")
  private Long alumnoId;
  @NotNull(message = "El ID del tutor de la empresa no puede ser nulo.")
  private Long tutorEmpresaId;
  @NotNull(message = "La fecha de inicio no puede ser nula.")
  private LocalDate fechaInicio;
  private LocalDate fechaFin;
}
