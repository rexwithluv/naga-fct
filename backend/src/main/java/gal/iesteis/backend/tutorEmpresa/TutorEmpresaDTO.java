package gal.iesteis.backend.tutorEmpresa;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class TutorEmpresaDTO {
    private String empresa;
    private String nombre;
    private String apellidos;
    private String email;
    private String telefono;
}
