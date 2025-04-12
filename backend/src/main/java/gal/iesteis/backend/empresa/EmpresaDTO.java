package gal.iesteis.backend.empresa;

import java.util.Map;
import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public abstract class EmpresaDTO {
    private Long id;
    private String nombre;
    private String concello;
    private String direccion;
    private String observaciones;
    private Map<String, String> contacto;
    private boolean activa;
    private Byte plazas;
    private Set<String> skills;
}
