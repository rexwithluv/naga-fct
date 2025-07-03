package gal.iesteis.backend.alumno;

import java.util.Map;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import gal.iesteis.backend.alumno.dto.AlumnoDTO;
import gal.iesteis.backend.alumno.dto.AlumnoDTOCreate;
import gal.iesteis.backend.alumno.dto.AlumnoDTOResponse;
import gal.iesteis.backend.alumno.dto.AlumnoDTOResponseAdmin;
import gal.iesteis.backend.concello.Concello;
import gal.iesteis.backend.concello.ConcelloService;
import gal.iesteis.backend.config.security.AuthUtils;
import gal.iesteis.backend.config.security.UserDetailsImpl;
import gal.iesteis.backend.estadoAlumno.EstadoAlumno;
import gal.iesteis.backend.estadoAlumno.EstadoAlumnoService;
import gal.iesteis.backend.tutorCentro.TutorCentro;
import gal.iesteis.backend.tutorCentro.TutorCentroRepository;
import gal.iesteis.backend.tutorCentro.exceptions.TutorCentroNotFoundException;

@Component
public class AlumnoDTOConverter {

  @Autowired
  private ModelMapper modelMapper;
  @Autowired
  private TutorCentroRepository tutorCentroRepository;
  @Autowired
  private ConcelloService concelloService;
  @Autowired
  private EstadoAlumnoService estadoAlumnoService;

  // Esto está fatal montado pero hasta ahora me parece la forma más sencilla de
  // no andar a dos métodos
  public AlumnoDTO alumnoADTOResponse(Alumno alumno, boolean isAdmin) {
    if (isAdmin) {
      AlumnoDTOResponseAdmin dto = modelMapper.map(alumno, AlumnoDTOResponseAdmin.class);
      dto.setConcello(
          Map.of(
              "id", alumno.getConcello().getId(),
              "nombre", alumno.getConcello().getNombre()));
      dto.setEstado(
          Map.of(
              "id", alumno.getEstado().getId(),
              "nombre", alumno.getEstado().getNombre()));
      dto.setTutorCentro(
          Map.of(
              "id",
              alumno.getTutorCentro().getId(),
              "nombre",
              alumno.getTutorCentro().getNombre() + " " + alumno.getTutorCentro().getApellidos(),
              "curso",
              alumno.getTutorCentro().getCurso().getCodigo()));
      return dto;
    }
    AlumnoDTOResponse dto = modelMapper.map(alumno, AlumnoDTOResponse.class);
    dto.setConcello(
        Map.of(
            "id", alumno.getConcello().getId(),
            "nombre", alumno.getConcello().getNombre()));
    dto.setEstado(
        Map.of(
            "id", alumno.getEstado().getId(),
            "nombre", alumno.getEstado().getNombre()));
    return dto;
  }

  public Alumno DTOCreateAAlumno(AlumnoDTOCreate dto, UserDetailsImpl userDetails) {
    Alumno alumno = modelMapper.map(dto, Alumno.class);
    boolean isAdmin = AuthUtils.isAdmin(userDetails);

    Concello concello = concelloService.obtenerPorId(dto.getConcello());
    EstadoAlumno estado = estadoAlumnoService.obtenerPorId(dto.getEstado());
    TutorCentro tutor = isAdmin
        ? tutorCentroRepository
            .findById(dto.getTutorCentro())
            .orElseThrow(() -> new TutorCentroNotFoundException(dto.getTutorCentro()))
        : tutorCentroRepository
            .findById(userDetails.getTutorCentroId())
            .orElseThrow(
                () -> new TutorCentroNotFoundException(userDetails.getTutorCentroId()));

    alumno.setConcello(concello);
    alumno.setEstado(estado);
    alumno.setTutorCentro(tutor);

    return alumno;
  }
}
