package gal.iesteis.backend.alumno;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AlumnoDTOAdmin extends AlumnoDTO {
    private String tutorCentro;
}
