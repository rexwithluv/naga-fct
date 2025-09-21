package gal.iesteis.backend.empresa;

import gal.iesteis.backend.concello.Concello;
import gal.iesteis.backend.concello.ConcelloService;
import gal.iesteis.backend.config.security.AuthUtils;
import gal.iesteis.backend.config.security.UserDetailsImpl;
import gal.iesteis.backend.empresa.dto.EmpresaDTO;
import gal.iesteis.backend.empresa.dto.EmpresaDTOCreate;
import gal.iesteis.backend.empresa.dto.EmpresaDTOResponse;
import gal.iesteis.backend.empresa.dto.EmpresaDTOResponseAdmin;
import gal.iesteis.backend.especialidad.Especialidad;
import gal.iesteis.backend.especialidad.EspecialidadService;
import gal.iesteis.backend.skill.Skill;
import gal.iesteis.backend.skill.SkillNotFoundException;
import gal.iesteis.backend.skill.SkillRepository;
import gal.iesteis.backend.tutorCentro.TutorCentroRepository;
import gal.iesteis.backend.tutorCentro.exceptions.TutorCentroNotFoundException;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class EmpresaDTOConverter {

  @Autowired private ConcelloService concelloService;

  @Autowired private EspecialidadService especialidadService;

  @Autowired private TutorCentroRepository tutorCentroRepository;

  @Autowired private SkillRepository skillRepository;

  @Autowired private ModelMapper modelMapper;

  public EmpresaDTO empresaADTOResponse(Empresa empresa, boolean isAdmin) {
    if (isAdmin) {
      EmpresaDTOResponseAdmin dto = new EmpresaDTOResponseAdmin();
      dto.setId(empresa.getId());
      dto.setNombre(empresa.getNombre());
      dto.setConcello(
          Map.of(
              "id", empresa.getConcello().getId(),
              "nombre", empresa.getConcello().getNombre()));
      dto.setDireccion(empresa.getDireccion());
      dto.setObservaciones(empresa.getObservaciones());
      dto.setContacto(
          new HashMap<String, String>() {
            {
              put("nombre", empresa.getContactoNombre());
              put("email", empresa.getContactoEmail());
              put("telefono", empresa.getContactoTelefono());
            }
          });
      dto.setActiva(empresa.getActiva());
      dto.setPlazas(empresa.getPlazas());
      dto.setSkills(
          empresa.getSkills().stream()
              .map(
                  skill ->
                      new HashMap<String, Object>() {
                        {
                          put("id", skill.getId());
                          put("nombre", skill.getNombre());
                        }
                      })
              .collect(Collectors.toSet()));
      dto.setEspecialidad(
          Map.of(
              "id", empresa.getEspecialidad().getId(),
              "nombre", empresa.getEspecialidad().getNombre()));

      return dto;
    }
    EmpresaDTOResponse dto = new EmpresaDTOResponse();
    dto.setId(empresa.getId());
    dto.setNombre(empresa.getNombre());
    dto.setConcello(
        Map.of(
            "id", empresa.getConcello().getId(),
            "nombre", empresa.getConcello().getNombre()));
    dto.setDireccion(empresa.getDireccion());
    dto.setObservaciones(empresa.getObservaciones());
    dto.setContacto(
        new HashMap<String, String>() {
          {
            put("nombre", empresa.getContactoNombre());
            put("email", empresa.getContactoEmail());
            put("telefono", empresa.getContactoTelefono());
          }
        });
    dto.setActiva(empresa.getActiva());
    dto.setPlazas(empresa.getPlazas());
    dto.setSkills(
        empresa.getSkills().stream()
            .map(
                skill ->
                    new HashMap<String, Object>() {
                      {
                        put("id", skill.getId());
                        put("nombre", skill.getNombre());
                      }
                    })
            .collect(Collectors.toSet()));
    return dto;
  }

  public Empresa DTOCreateAEmpresa(EmpresaDTOCreate dto, UserDetailsImpl userDetails) {
    Empresa empresa = modelMapper.map(dto, Empresa.class);
    boolean isAdmin = AuthUtils.isAdmin(userDetails);

    Concello concello = concelloService.obtenerPorId(dto.getConcello());
    String contactoNombre = dto.getContacto().get("nombre");
    String contactoEmail = dto.getContacto().get("email");
    String contactoTelefono = dto.getContacto().get("telefono");
    Set<Skill> skills =
        dto.getSkills().stream()
            .map(s -> skillRepository.findById(s).orElseThrow(() -> new SkillNotFoundException(s)))
            .collect(Collectors.toSet());
    Especialidad especialidad =
        isAdmin
            ? especialidadService.getById(dto.getEspecialidad())
            : (tutorCentroRepository
                .findById(userDetails.getTutorCentroId())
                .orElseThrow(() -> new TutorCentroNotFoundException(userDetails.getTutorCentroId()))
                .getCurso()
                .getEspecialidad());

    empresa.setConcello(concello);
    empresa.setContactoNombre(contactoNombre);
    empresa.setContactoEmail(contactoEmail);
    empresa.setContactoTelefono(contactoTelefono);
    empresa.setSkills(skills);
    empresa.setEspecialidad(especialidad);

    return empresa;
  }
}
