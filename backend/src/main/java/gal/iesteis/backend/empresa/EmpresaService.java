package gal.iesteis.backend.empresa;

import gal.iesteis.backend.config.security.AuthUtils;
import gal.iesteis.backend.config.security.UserDetailsImpl;
import gal.iesteis.backend.empresa.dto.EmpresaDTO;
import gal.iesteis.backend.empresa.dto.EmpresaDTOCreate;
import gal.iesteis.backend.especialidad.Especialidad;
import gal.iesteis.backend.tutorCentro.TutorCentro;
import gal.iesteis.backend.tutorCentro.TutorCentroNotFoundException;
import gal.iesteis.backend.tutorCentro.TutorCentroRepository;
import java.util.ArrayList;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmpresaService {

  private static final Logger logger = LoggerFactory.getLogger(EmpresaService.class);

  @Autowired private EmpresaRepository repository;

  @Autowired private TutorCentroRepository tutorCentroRepository;

  @Autowired private EmpresaDTOConverter dtoConverter;

  public List<EmpresaDTO> obtenerTodas(UserDetailsImpl userDetails) {
    boolean isAdmin = AuthUtils.isAdmin(userDetails);
    List<Empresa> empresas = new ArrayList<>();

    if (isAdmin) {
      empresas = repository.findAll();
    } else {
      TutorCentro tutor =
          tutorCentroRepository
              .findById(userDetails.getTutorCentroId())
              .orElseThrow(() -> new TutorCentroNotFoundException(userDetails.getTutorCentroId()));
      Especialidad especialidad = tutor.getCurso().getEspecialidad();

      empresas = repository.findByEspecialidad(especialidad);
    }

    return empresas.stream()
        .map(empresa -> dtoConverter.empresaADTOResponse(empresa, isAdmin))
        .toList();
  }

  public EmpresaDTO obtenerPorId(UserDetailsImpl userDetails, Long id) {
    Empresa empresa = repository.findById(id).orElseThrow(() -> new EmpresaNotFoundException(id));

    boolean isAdmin = AuthUtils.isAdmin(userDetails);
    if (!isAdmin) {
      TutorCentro tutor =
          tutorCentroRepository
              .findById(userDetails.getTutorCentroId())
              .orElseThrow(() -> new TutorCentroNotFoundException(userDetails.getTutorCentroId()));
      boolean esEmpresaEspecialidad =
          empresa.getEspecialidad().getId().equals(tutor.getCurso().getEspecialidad().getId());

      if (!esEmpresaEspecialidad) {
        throw new EmpresaForbiddenException(id);
      }
    }
    return dtoConverter.empresaADTOResponse(empresa, isAdmin);
  }

  public EmpresaDTO crearEmpresa(UserDetailsImpl userDetails, EmpresaDTOCreate dto) {
    Empresa nuevaEmpresa = repository.save(dtoConverter.DTOCreateAEmpresa(dto, userDetails));

    return dtoConverter.empresaADTOResponse(nuevaEmpresa, AuthUtils.isAdmin(userDetails));
  }
}
