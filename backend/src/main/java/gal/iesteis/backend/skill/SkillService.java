package gal.iesteis.backend.skill;

import gal.iesteis.backend.config.security.AuthUtils;
import gal.iesteis.backend.config.security.UserDetailsImpl;
import gal.iesteis.backend.especialidad.Especialidad;
import gal.iesteis.backend.skill.dto.SkillDtoConverter;
import gal.iesteis.backend.skill.dto.SkillDto;
import gal.iesteis.backend.tutorCentro.TutorCentro;
import gal.iesteis.backend.tutorCentro.TutorCentroService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SkillService {
  @Autowired private SkillRepository repository;

  @Autowired private SkillDtoConverter dtoConverter;

  @Autowired private TutorCentroService tutorCentroService;

  public List<? extends SkillDto> getAll(UserDetailsImpl userDetails) {
    if (AuthUtils.isAdmin(userDetails)) {
      return repository.findAll().stream()
          .map(skill -> dtoConverter.skillToDtoGetAdmin(skill))
          .toList();
    }

    TutorCentro tutorUsuario =
        tutorCentroService.obtenerTutorCentroPorid(userDetails.getTutorCentroId());
    Especialidad especialidadUsuario = tutorUsuario.getCurso().getEspecialidad();

    return repository.findByEspecialidad(especialidadUsuario).stream()
        .map(skill -> dtoConverter.skillToDtoGet(skill))
        .toList();
  }
}
