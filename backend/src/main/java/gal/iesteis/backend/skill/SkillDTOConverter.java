package gal.iesteis.backend.skill;

import java.util.Map;

import org.springframework.stereotype.Component;

import gal.iesteis.backend.especialidad.Especialidad;
import gal.iesteis.backend.skill.dto.SkillDTO;
import gal.iesteis.backend.skill.dto.SkillDTOResponse;

@Component
public class SkillDTOConverter {

  public SkillDTO skillADtoResponse(Skill skill) {
    SkillDTOResponse dto = new SkillDTOResponse();

    dto.setId(skill.getId());
    dto.setNombre(skill.getNombre());
    Especialidad especialidad = skill.getEspecialidad();
    dto.setEspecialidad(Map.of(
        "id", especialidad.getId(),
        "nombre", especialidad.getNombre()));

    return dto;
  }
}
