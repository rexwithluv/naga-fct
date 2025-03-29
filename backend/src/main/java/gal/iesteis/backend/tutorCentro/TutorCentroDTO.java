package gal.iesteis.backend.tutorCentro;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class TutorCentroDTO {
    private String nombre;
    private String apellidos;
    private String email;
    private String curso;
    private String activo;
}
