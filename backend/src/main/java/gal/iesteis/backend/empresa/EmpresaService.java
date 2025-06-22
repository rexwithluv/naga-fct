package gal.iesteis.backend.empresa;

import gal.iesteis.backend.config.security.AuthUtils;
import gal.iesteis.backend.config.security.UserDetailsImpl;
import gal.iesteis.backend.empresa.dto.EmpresaDTO;
import gal.iesteis.backend.empresa.dto.EmpresaDTOCreate;
import gal.iesteis.backend.empresa.exceptions.EmpresaForbiddenException;
import gal.iesteis.backend.empresa.exceptions.EmpresaNotFoundException;
import gal.iesteis.backend.especialidad.Especialidad;
import gal.iesteis.backend.tutorCentro.TutorCentro;
import gal.iesteis.backend.tutorCentro.TutorCentroRepository;
import gal.iesteis.backend.tutorCentro.exceptions.TutorCentroNotFoundException;
import jakarta.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmpresaService {

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

  public Empresa obtenerEmpresaPorId(UserDetailsImpl userDetails, Long id) {
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

    return empresa;
  }

  public EmpresaDTO obtenerPorId(UserDetailsImpl userDetails, Long id) {
    Empresa empresa = obtenerEmpresaPorId(userDetails, id);
    boolean isAdmin = AuthUtils.isAdmin(userDetails);

    return dtoConverter.empresaADTOResponse(empresa, isAdmin);
  }

  @Transactional
  public EmpresaDTO crearEmpresa(UserDetailsImpl userDetails, EmpresaDTOCreate dto) {
    Empresa nuevaEmpresa = repository.save(dtoConverter.DTOCreateAEmpresa(dto, userDetails));

    return dtoConverter.empresaADTOResponse(nuevaEmpresa, AuthUtils.isAdmin(userDetails));
  }

  @Transactional
  public EmpresaDTO updateEmpresa(UserDetailsImpl userDetails, EmpresaDTOCreate dto, Long id) {
    boolean isAdmin = AuthUtils.isAdmin(userDetails);
    Empresa empresa = dtoConverter.DTOCreateAEmpresa(dto, userDetails);
    empresa.setId(id);
    empresa = repository.save(empresa);
    return dtoConverter.empresaADTOResponse(empresa, isAdmin);
  }

  @Transactional
  public void deleteEmpresa(UserDetailsImpl userDetails, Long id) {
    Empresa empresa = obtenerEmpresaPorId(userDetails, id);

    empresa.setActiva(false);

    repository.save(empresa);
  }
}
