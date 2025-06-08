package gal.iesteis.backend.skill;

import gal.iesteis.backend.config.security.AuthUtils;
import gal.iesteis.backend.config.security.UserDetailsImpl;
import gal.iesteis.backend.especialidad.Especialidad;
import gal.iesteis.backend.skill.dto.SkillDTO;
import gal.iesteis.backend.tutorCentro.TutorCentro;
import gal.iesteis.backend.tutorCentro.TutorCentroService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SkillService {
  @Autowired private SkillRepository repository;

  @Autowired private SkillDTOConverter dtoConverter;

  @Autowired private TutorCentroService tutorCentroService;

  public List<SkillDTO> obtenerTodas(UserDetailsImpl userDetails) {
    if (AuthUtils.isAdmin(userDetails)) {
      return repository.findAll().stream()
          .map(skill -> dtoConverter.skillADtoResponse(skill))
          .toList();
    }

    TutorCentro tutorUsuario =
        tutorCentroService.obtenerTutorCentroPorid(userDetails.getTutorCentroId());
    Especialidad especialidadUsuario = tutorUsuario.getCurso().getEspecialidad();

    return repository.findByEspecialidad(especialidadUsuario).stream()
        .map(skill -> dtoConverter.skillADtoResponse(skill))
        .toList();
  }
}
