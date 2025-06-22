package gal.iesteis.backend.fct;

import gal.iesteis.backend.alumno.Alumno;
import gal.iesteis.backend.alumno.AlumnoService;
import gal.iesteis.backend.config.security.UserDetailsImpl;
import gal.iesteis.backend.fct.dto.FCTDTO;
import gal.iesteis.backend.fct.dto.FCTDTOCreate;
import gal.iesteis.backend.fct.dto.FCTDTOResponse;
import gal.iesteis.backend.fct.dto.FCTDTOResponseAdmin;
import gal.iesteis.backend.tutorCentro.TutorCentro;
import gal.iesteis.backend.tutorEmpresa.TutorEmpresa;
import gal.iesteis.backend.tutorEmpresa.TutorEmpresaService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class FCTDTOConverter {

  @Autowired private ModelMapper modelMapper;

  @Autowired private AlumnoService alumnoService;

  @Autowired private TutorEmpresaService tutorEmpresaService;

  public FCTDTO fctADtoResponse(FCT fct, boolean isAdmin) {
    if (isAdmin) {
      FCTDTOResponseAdmin dto = modelMapper.map(fct, FCTDTOResponseAdmin.class);

      dto.setAlumno(fct.getAlumno().getNombre());
      dto.setTutorEmpresa(
          fct.getTutorEmpresa().getNombre() + " " + fct.getTutorEmpresa().getApellidos());
      dto.setEmpresa(fct.getTutorEmpresa().getEmpresa().getNombre());
      TutorCentro tutorAlumno = fct.getAlumno().getTutorCentro();
      dto.setTutorCentro(tutorAlumno.getNombre() + " " + tutorAlumno.getApellidos());

      return dto;
    }
    FCTDTOResponse dto = modelMapper.map(fct, FCTDTOResponse.class);

    dto.setAlumno(fct.getAlumno().getNombre());
    dto.setTutorEmpresa(
        fct.getTutorEmpresa().getNombre() + " " + fct.getTutorEmpresa().getApellidos());
    dto.setEmpresa(fct.getTutorEmpresa().getEmpresa().getNombre());

    return dto;
  }

  public FCT dtoCreateAFct(UserDetailsImpl userDetails, FCTDTOCreate dto) {
    FCT fct = new FCT();

    Alumno alumno = alumnoService.obtenerAlumnoPorId(userDetails, dto.getAlumnoId());
    TutorEmpresa tutorEmpresa =
        tutorEmpresaService.obtenerTutorEmpresaPorId(dto.getTutorEmpresaId());

    fct.setAlumno(alumno);
    fct.setTutorEmpresa(tutorEmpresa);
    fct.setFechaInicio(dto.getFechaInicio());
    fct.setFechaFin(dto.getFechaFin());

    return fct;
  }
}
