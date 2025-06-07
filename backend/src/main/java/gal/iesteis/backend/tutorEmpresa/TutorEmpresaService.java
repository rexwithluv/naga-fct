package gal.iesteis.backend.tutorEmpresa;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import gal.iesteis.backend.alumno.Alumno;
import gal.iesteis.backend.config.security.AuthUtils;
import gal.iesteis.backend.config.security.UserDetailsImpl;
import gal.iesteis.backend.especialidad.Especialidad;
import gal.iesteis.backend.tutorCentro.TutorCentroService;
import gal.iesteis.backend.tutorEmpresa.dto.TutorEmpresaDTO;
import gal.iesteis.backend.tutorEmpresa.exceptions.TutorEmpresaNotFoundException;

@Service
public class TutorEmpresaService {

  @Autowired
  private TutorEmpresaRepository repository;

  @Autowired
  private TutorEmpresaDTOConverter dtoConverter;

  @Autowired
  private TutorCentroService tutorCentroService;

  public TutorEmpresa obtenerTutorEmpresaPorId(Long id) {
    return repository.findById(id).orElseThrow(() -> new TutorEmpresaNotFoundException(id));
  }

  public List<TutorEmpresaDTO> obtenerTodos(UserDetailsImpl userDetails) {
    boolean isAdmin = AuthUtils.isAdmin(userDetails);

    List<TutorEmpresa> tutores = repository.findAll();

    if (isAdmin) {
      return tutores.stream().map(tutor -> dtoConverter.tutorEmpresaADtoResponse(tutor)).toList();
    }

    Especialidad miEspecialidad = tutorCentroService.obtenerTutorCentroPorid(userDetails.getTutorCentroId()).getCurso()
        .getEspecialidad();
    List<TutorEmpresa> tutoresEspecialidad = tutores.stream()
        .filter(tutor -> tutor.getEmpresa().getEspecialidad().equals(miEspecialidad)).toList();

    return tutoresEspecialidad.stream().map(tutor -> dtoConverter.tutorEmpresaADtoResponse(tutor)).toList();
  }

  public TutorEmpresaDTO obtenerPorId(Long id) {
    TutorEmpresa tutor = obtenerTutorEmpresaPorId(id);
    return dtoConverter.tutorEmpresaADtoResponse(tutor);
  }
}
