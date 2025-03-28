package gal.iesteis.backend.empresa;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmpresaService {

    @Autowired
    private EmpresaRepository repository;

    @Autowired
    private ModelMapper modelMapper;

    private EmpresaDTO empresaADTO(Empresa empresa) {
        EmpresaDTO dto = modelMapper.map(empresa, EmpresaDTO.class);

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

    public List<EmpresaDTO> obtenerTodas() {
        List<Empresa> empresas = repository.findAll();
        return empresas.stream().map(empresa -> empresaADTO(empresa)).toList();
    }

    public EmpresaDTO obtenerPorId(Long id) {
        Empresa empresa = repository.findById(id).orElseThrow(() -> new EmpresaNotFoundException(id));
        return empresaADTO(empresa);
    }
}
