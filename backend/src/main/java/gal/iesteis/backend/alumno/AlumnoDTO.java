package gal.iesteis.backend.alumno;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public abstract class AlumnoDTO {
    private Long id;
    private String dniNie;
    private String nombre;
    private String apellidos;
    private String email;
    private String telefono;
    private String concello;
    private String numeroSeguridadSocial;
    private String estado;
}
