package gal.iesteis.backend.fct;

import gal.iesteis.backend.alumno.Alumno;
import gal.iesteis.backend.alumno.AlumnoRepository;
import gal.iesteis.backend.alumno.AlumnoService;
import gal.iesteis.backend.config.security.AuthUtils;
import gal.iesteis.backend.config.security.UserDetailsImpl;
import gal.iesteis.backend.fct.dto.FCTDTO;
import gal.iesteis.backend.fct.dto.FCTDTOCreate;
import gal.iesteis.backend.fct.exceptions.FCTForbiddenCreateException;
import gal.iesteis.backend.fct.exceptions.FCTForbiddenException;
import gal.iesteis.backend.fct.exceptions.FCTNotFoundException;
import gal.iesteis.backend.tutorCentro.TutorCentro;
import gal.iesteis.backend.tutorCentro.TutorCentroService;
import gal.iesteis.backend.tutorEmpresa.TutorEmpresa;
import gal.iesteis.backend.tutorEmpresa.TutorEmpresaService;
import jakarta.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FCTService {

  @Autowired private FCTRepository repository;

  @Autowired private AlumnoRepository alumnoRepository;

  @Autowired private AlumnoService alumnoService;

  @Autowired private TutorEmpresaService tutorEmpresaService;

  @Autowired private TutorCentroService tutorCentroService;

  @Autowired private FCTDTOConverter dtoConverter;

  public List<FCTDTO> obtenerTodas(UserDetailsImpl userDetails) {
    boolean isAdmin = AuthUtils.isAdmin(userDetails);
    List<FCT> fcts =
        isAdmin
            ? repository.findAll()
            : repository.findByAlumnoIn(
                alumnoRepository.findByTutorCentroId(userDetails.getTutorCentroId()));

    return fcts.stream().map(fct -> dtoConverter.fctADtoResponse(fct, isAdmin)).toList();
  }

  public FCT getFctById(UserDetailsImpl userDetails, Long id) {
    FCT fct = repository.findById(id).orElseThrow(() -> new FCTNotFoundException(id));

    boolean isAdmin = AuthUtils.isAdmin(userDetails);
    List<FCT> fcts =
        isAdmin
            ? repository.findAll()
            : repository.findByAlumnoIn(
                alumnoRepository.findByTutorCentroId(userDetails.getTutorCentroId()));

    boolean fctInFcts = fcts.stream().anyMatch(f -> f.getId().equals(id));
    if (!fctInFcts) {
      throw new FCTForbiddenException(id);
    }

    return fct;
  }

  public FCTDTO obtenerPorId(UserDetailsImpl userDetails, Long id) {
    FCT fct = getFctById(userDetails, id);
    boolean isAdmin = AuthUtils.isAdmin(userDetails);

    return dtoConverter.fctADtoResponse(fct, isAdmin);
  }

  @Transactional
  public FCTDTO crearFct(UserDetailsImpl userDetails, FCTDTOCreate dto) {
    boolean isAdmin = AuthUtils.isAdmin(userDetails);

    if (isAdmin) {
      FCT nuevaFct = repository.save(dtoConverter.dtoCreateAFct(userDetails, dto));
      return dtoConverter.fctADtoResponse(nuevaFct, isAdmin);
    }

    TutorCentro tutor = tutorCentroService.obtenerTutorCentroPorid(userDetails.getTutorCentroId());
    Alumno alumno = alumnoService.obtenerAlumnoPorId(userDetails, dto.getAlumnoId());
    TutorEmpresa tutorEmpresa =
        tutorEmpresaService.obtenerTutorEmpresaPorId(dto.getTutorEmpresaId());
    boolean esTutorDelAlumno = alumno.getTutorCentro().equals(tutor);
    boolean esEmpresaEspecialidad =
        tutor.getCurso().getEspecialidad().equals(tutorEmpresa.getEmpresa().getEspecialidad());

    if (!esTutorDelAlumno || !esEmpresaEspecialidad) {
      throw new FCTForbiddenCreateException();
    }

    FCT nuevaFct = repository.save(dtoConverter.dtoCreateAFct(userDetails, dto));
    return dtoConverter.fctADtoResponse(nuevaFct, isAdmin);
  }

  @Transactional
  public FCTDTO updateFct(UserDetailsImpl userDetails, FCTDTOCreate dto, Long id) {
    boolean isAdmin = AuthUtils.isAdmin(userDetails);
    FCT fct = dtoConverter.dtoCreateAFct(userDetails, dto);

    fct.setId(id);
    fct = repository.save(fct);

    return dtoConverter.fctADtoResponse(fct, isAdmin);
  }

  @Transactional
  public void deleteFct(UserDetailsImpl userDetails, Long id) {
    FCT fct = getFctById(userDetails, id);

    LocalDate hoy = LocalDate.now();
    fct.setFechaFin(hoy);

    repository.save(fct);
  }
}
