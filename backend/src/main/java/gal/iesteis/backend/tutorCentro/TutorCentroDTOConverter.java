package gal.iesteis.backend.tutorCentro;

import gal.iesteis.backend.tutorCentro.dto.TutorCentroDTO;
import gal.iesteis.backend.tutorCentro.dto.TutorCentroDTOResponseAdmin;
import gal.iesteis.backend.tutorCentro.dto.TutorCentroDTOResponseSelect;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class TutorCentroDTOConverter {

  @Autowired private ModelMapper modelMapper;

  public TutorCentroDTO tutorCentroADTOResponseAdmin(TutorCentro tutor) {
    TutorCentroDTOResponseAdmin dto = modelMapper.map(tutor, TutorCentroDTOResponseAdmin.class);

    dto.setCurso(tutor.getCurso().getNombre());

    return dto;
  }

  public TutorCentroDTO tutorCentroADTOResponseSelect(TutorCentro tutor) {
    TutorCentroDTOResponseSelect dto = modelMapper.map(tutor, TutorCentroDTOResponseSelect.class);

    dto.setNombreCompletoCurso(
        String.format(
            "%s %s - %s", tutor.getNombre(), tutor.getApellidos(), tutor.getCurso().getCodigo()));

    return dto;
  }
}
