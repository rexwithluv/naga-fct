package gal.iesteis.backend.skill;

import gal.iesteis.backend.skill.dto.SkillDTO;
import gal.iesteis.backend.skill.dto.SkillDTOResponse;
import org.springframework.stereotype.Component;

@Component
public class SkillDTOConverter {

  public SkillDTO skillADtoResponse(Skill skill) {
    SkillDTOResponse dto = new SkillDTOResponse();

    dto.setId(skill.getId());
    dto.setNombre(skill.getNombre());
    dto.setEspecialidadId(skill.getEspecialidad().getId());

    return dto;
  }
}
