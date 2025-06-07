package gal.iesteis.backend.tutorEmpresa.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class TutorEmpresaDTOCreate extends TutorEmpresaDTO {
    private Long id;
    private Long empresaId;
    private String nombre;
    private String apellidos;
    private String email;
    private String telefono;
}
