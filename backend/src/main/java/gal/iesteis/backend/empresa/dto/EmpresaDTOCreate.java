package gal.iesteis.backend.empresa.dto;

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
public class EmpresaDTOCreate extends EmpresaDTO {
    private String nombre;
    private Integer concello;
    private String direccion;
    private String observaciones;
    private Map<String, String> contacto;
    private boolean activa;
    private Byte plazas;
    private Set<Integer> skills;
    private Byte especialidad;
}
