package gal.iesteis.backend.tutorEmpresa;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TutorEmpresaService {

    @Autowired
    private TutorEmpresaRepository repository;

    @Autowired
    private ModelMapper modelMapper;

    private TutorEmpresaDTO tutorEmpresaADTO(TutorEmpresa tutor) {
        TutorEmpresaDTO dto = modelMapper.map(tutor, TutorEmpresaDTO.class);

        dto.setEmpresa(tutor.getEmpresa().getNombre());

        return dto;
    }

    public TutorEmpresaDTO obtenerPorId(Long id) {
        TutorEmpresa tutor = repository.findById(id).orElseThrow(() -> new TutorEmpresaNotFoundException(id));
        return tutorEmpresaADTO(tutor);

    }
}
