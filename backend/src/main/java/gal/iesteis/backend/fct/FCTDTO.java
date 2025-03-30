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
    private String alumno;
    private String tutor;
    private String empresa;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
}