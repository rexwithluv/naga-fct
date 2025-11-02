package gal.iesteis.backend.skill.dto;

import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SkillDtoGetAdmin extends SkillDto {
  private Integer id;
  private String nombre;
  private Map<String, Object> especialidad;
}
