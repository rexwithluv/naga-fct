package gal.iesteis.backend.skill.dto;

import gal.iesteis.backend.especialidad.Especialidad;
import gal.iesteis.backend.skill.Skill;
import java.util.Map;
import org.springframework.stereotype.Component;

@Component
public class SkillDtoConverter {

  public SkillDtoGet skillToDtoGet(Skill skill) {
    SkillDtoGet dto = new SkillDtoGet();

    dto.setId(skill.getId());
    dto.setNombre(skill.getNombre());

    return dto;
  }

  public SkillDtoGetAdmin skillToDtoGetAdmin(Skill skill) {
    SkillDtoGetAdmin dto = new SkillDtoGetAdmin();

    dto.setId(skill.getId());
    dto.setNombre(skill.getNombre());

    Especialidad especialidad = skill.getEspecialidad();
    dto.setEspecialidad(
        Map.of(
            "id", especialidad.getId(),
            "nombre", especialidad.getNombre()));

    return dto;
  }
}
