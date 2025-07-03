package gal.iesteis.backend.tutorCentro;

import gal.iesteis.backend.curso.Curso;
import gal.iesteis.backend.tutorCentro.dto.TutorCentroDTO;
import gal.iesteis.backend.tutorCentro.dto.TutorCentroDTOCreate;
import gal.iesteis.backend.tutorCentro.dto.TutorCentroDTOResponseAdmin;
import gal.iesteis.backend.usuario.Usuario;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class TutorCentroDTOConverter {

  @Autowired private ModelMapper modelMapper;

  public TutorCentroDTO tutorCentroADtoResponseAdmin(TutorCentro tutor) {
    TutorCentroDTOResponseAdmin dto = modelMapper.map(tutor, TutorCentroDTOResponseAdmin.class);

    if (tutor.getCurso() != null) {
      dto.setCurso(tutor.getCurso().getNombre());
    }

    return dto;
  }

  public TutorCentro dtoCreateATutorCentro(TutorCentroDTOCreate dto, Curso curso, Usuario usuario) {
    // Existe un problema con modelMapper en este caso así que preferimos hacerlo a
    // mano
    // TutorCentro tutorCentro = modelMapper.map(dto, TutorCentro.class);

    TutorCentro tutorCentro = new TutorCentro();

    tutorCentro.setNombre(dto.getNombre());
    tutorCentro.setApellidos(dto.getApellidos());
    tutorCentro.setEmail(dto.getEmail());
    tutorCentro.setCurso(curso);
    tutorCentro.setUsuario(usuario);
    tutorCentro.setActivo(true);

    return tutorCentro;
  }
}
