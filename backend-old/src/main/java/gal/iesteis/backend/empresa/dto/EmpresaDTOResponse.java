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
public class EmpresaDTOResponse extends EmpresaDTO {
  private Long id;
  private String nombre;
  private Map<String, Object> concello;
  private String direccion;
  private String observaciones;
  private Map<String, String> contacto;
  private Boolean activa;
  private Short plazas;
  private Set<Map<String, Object>> skills;
}
