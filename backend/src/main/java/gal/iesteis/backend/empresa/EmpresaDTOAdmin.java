package gal.iesteis.backend.empresa;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class EmpresaDTOAdmin extends EmpresaDTO {
    private String especialidad;
}
