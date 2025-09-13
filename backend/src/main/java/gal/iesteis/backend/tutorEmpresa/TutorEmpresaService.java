package gal.iesteis.backend.tutorEmpresa;

import gal.iesteis.backend.config.security.AuthUtils;
import gal.iesteis.backend.config.security.UserDetailsImpl;
import gal.iesteis.backend.empresa.Empresa;
import gal.iesteis.backend.empresa.EmpresaService;
import gal.iesteis.backend.especialidad.Especialidad;
import gal.iesteis.backend.tutorCentro.TutorCentroService;
import gal.iesteis.backend.tutorEmpresa.dto.TutorEmpresaDTO;
import gal.iesteis.backend.tutorEmpresa.dto.TutorEmpresaDTOCreate;
import gal.iesteis.backend.tutorEmpresa.exceptions.TutorEmpresaForbiddenCreateException;
import gal.iesteis.backend.tutorEmpresa.exceptions.TutorEmpresaNotFoundException;
import jakarta.transaction.Transactional;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TutorEmpresaService {

  @Autowired private TutorEmpresaRepository repository;

  @Autowired private TutorEmpresaDTOConverter dtoConverter;

  @Autowired private TutorCentroService tutorCentroService;

  @Autowired private EmpresaService empresaService;

  public List<TutorEmpresaDTO> obtenerTodos(UserDetailsImpl userDetails) {
    boolean isAdmin = AuthUtils.isAdmin(userDetails);

    List<TutorEmpresa> tutores = repository.findAll();

    if (isAdmin) {
      return tutores.stream().map(tutor -> dtoConverter.tutorEmpresaADtoResponse(tutor)).toList();
    }

    Especialidad miEspecialidad =
        tutorCentroService
            .obtenerTutorCentroPorid(userDetails.getTutorCentroId())
            .getCurso()
            .getEspecialidad();
    List<TutorEmpresa> tutoresEspecialidad =
        tutores.stream()
            .filter(tutor -> tutor.getEmpresa().getEspecialidad().equals(miEspecialidad))
            .toList();

    return tutoresEspecialidad.stream()
        .map(tutor -> dtoConverter.tutorEmpresaADtoResponse(tutor))
        .toList();
  }

  public TutorEmpresa obtenerTutorEmpresaPorId(Long id) {
    return repository.findById(id).orElseThrow(() -> new TutorEmpresaNotFoundException(id));
  }

  public TutorEmpresaDTO obtenerPorId(Long id) {
    TutorEmpresa tutor = obtenerTutorEmpresaPorId(id);
    return dtoConverter.tutorEmpresaADtoResponse(tutor);
  }

  @Transactional
  public TutorEmpresaDTO crearTutorEmpresa(UserDetailsImpl userDetails, TutorEmpresaDTOCreate dto) {
    boolean isAdmin = AuthUtils.isAdmin(userDetails);
    Empresa empresa = empresaService.obtenerEmpresaPorId(userDetails, dto.getEmpresa());

    if (isAdmin) {
      TutorEmpresa nuevoTutorEmpresa = repository.save(dtoConverter.dtoATutorEmpresa(dto, empresa));
      return dtoConverter.tutorEmpresaADtoResponse(nuevoTutorEmpresa);
    }

    Especialidad miEspecialidad =
        tutorCentroService
            .obtenerTutorCentroPorid(userDetails.getTutorCentroId())
            .getCurso()
            .getEspecialidad();
    Especialidad especialidadNuevoTutor =
        dtoConverter.dtoATutorEmpresa(dto, empresa).getEmpresa().getEspecialidad();
    boolean mismaEspecialidad = miEspecialidad.equals(especialidadNuevoTutor);

    if (!mismaEspecialidad) {
      throw new TutorEmpresaForbiddenCreateException();
    }

    TutorEmpresa nuevoTutorEmpresa = repository.save(dtoConverter.dtoATutorEmpresa(dto, empresa));
    return dtoConverter.tutorEmpresaADtoResponse(nuevoTutorEmpresa);
  }

  @Transactional
  public TutorEmpresaDTO updateTutorEmpresa(
      UserDetailsImpl userDetails, TutorEmpresaDTOCreate dto, Long id) {
    Empresa empresa = empresaService.obtenerEmpresaPorId(userDetails, dto.getEmpresa());
    TutorEmpresa tutorEmpresa = dtoConverter.dtoATutorEmpresa(dto, empresa);
    tutorEmpresa.setId(id);

    tutorEmpresa = repository.save(tutorEmpresa);
    return dtoConverter.tutorEmpresaADtoResponse(tutorEmpresa);
  }
}
