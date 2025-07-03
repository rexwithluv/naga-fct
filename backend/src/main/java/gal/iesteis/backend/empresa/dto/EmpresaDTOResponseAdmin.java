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
public class EmpresaDTOResponseAdmin extends EmpresaDTO {
  private Long id;
  private String nombre;
  private String concello;
  private String direccion;
  private String observaciones;
  private Map<String, String> contacto;
  private Boolean activa;
  private Byte plazas;
  private Set<String> skills;
  private String especialidad;
}
