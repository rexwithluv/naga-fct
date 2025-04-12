package gal.iesteis.backend.empresa;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import gal.iesteis.backend.config.security.AuthUtils;
import gal.iesteis.backend.config.security.UserDetailsImpl;
import gal.iesteis.backend.especialidad.Especialidad;
import gal.iesteis.backend.tutorCentro.TutorCentro;
import gal.iesteis.backend.tutorCentro.TutorCentroNotFoundException;
import gal.iesteis.backend.tutorCentro.TutorCentroRepository;

@Service
public class EmpresaService {

    @Autowired
    private EmpresaRepository repository;

    @Autowired
    private TutorCentroRepository tutorCentroRepository;

    @Autowired
    private ModelMapper modelMapper;

    private EmpresaDTOAdmin empresaADTOAdmin(Empresa empresa) {
        EmpresaDTOAdmin dto = modelMapper.map(empresa, EmpresaDTOAdmin.class);

        dto.setConcello(empresa.getConcello().getNombre());
        dto.setEspecialidad(empresa.getEspecialidad().getNombre());
        dto.setContacto(new HashMap<String, String>() {
            {
                put("nombre", empresa.getContactoNombre());
                put("email", empresa.getContactoEmail());
                put("telefono", empresa.getContactoTelefono());
            }
        });
        dto.setSkills(empresa.getSkills().stream().map(skill -> skill.getNombre()).collect(Collectors.toSet()));

        return dto;
    }

    private EmpresaDTOComun empresaADTOComun(Empresa empresa) {
        EmpresaDTOComun dto = modelMapper.map(empresa, EmpresaDTOComun.class);

        dto.setConcello(empresa.getConcello().getNombre());
        dto.setContacto(new HashMap<String, String>() {
            {
                put("nombre", empresa.getContactoNombre());
                put("email", empresa.getContactoEmail());
                put("telefono", empresa.getContactoTelefono());
            }
        });
        dto.setSkills(empresa.getSkills().stream().map(skill -> skill.getNombre()).collect(Collectors.toSet()));

        return dto;
    }

    public List<EmpresaDTO> obtenerTodas(UserDetailsImpl userDetails) {
        boolean isAdmin = AuthUtils.isAdmin(userDetails);
        List<Empresa> empresas = new ArrayList<>();

        if (isAdmin) {
            empresas = repository.findAll();
        } else {
            TutorCentro tutor = tutorCentroRepository.findById(userDetails.getTutorCentroId())
                    .orElseThrow(() -> new TutorCentroNotFoundException(userDetails.getTutorCentroId()));
            Especialidad especialidad = tutor.getCurso().getEspecialidad();

            empresas = repository.findByEspecialidad(especialidad);
        }

        return empresas.stream().map(empresa -> isAdmin ? empresaADTOAdmin(empresa) : empresaADTOComun(empresa))
                .toList();
    }

    public EmpresaDTO obtenerPorId(UserDetailsImpl userDetails, Long id) {
        Empresa empresa = repository.findById(id).orElseThrow(() -> new EmpresaNotFoundException(id));

        List<EmpresaDTO> empresas = obtenerTodas(userDetails);
        boolean empresaEnEmpresas = empresas.stream().anyMatch(e -> e.getId().equals(empresa.getId()));
        boolean isAdmin = AuthUtils.isAdmin(userDetails);

        if (!isAdmin && !empresaEnEmpresas) {
            throw new EmpresaForbiddenException(id);
        }
        return isAdmin ? empresaADTOAdmin(empresa) : empresaADTOComun(empresa);
    }
}
